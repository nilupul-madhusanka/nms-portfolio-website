"use client";
import { useContext, useEffect, useRef } from "react";
import { HeroMotionContext } from "./HeroMotion";

/**
 * 3D Animated Hexagonal Grid Background — Optimized
 * Adapted from HexCore 3D Engine for React/Next.js
 *
 * Defaults: wave speed 1x, 3D depth 25px, glow 100%, hex size 46px
 * Color: Neon Blue (#1F51FF)
 *
 * Optimizations:
 *  - Fixed-step physics sub-stepping (prevents jitter on frame drops)
 *  - Spatial bucketing skips off-screen hexagons during render
 *  - Debounced resize to avoid thrashing
 *  - Pre-computed trig constants & reduced per-frame allocations
 *  - Exponential smoothing for pointer interpolation
 */
export default function HexagonalBackground() {
  const canvasRef = useRef(null);
  const motionEnabled = useContext(HeroMotionContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ── Configuration ──
    const config = {
      hexRadius: 46,
      gap: 2.2,
      maxElevation: 25,
      speed: 1.0,
      glowIntensity: 1.0,
      extrudeDirX: -0.32,
      extrudeDirY: 0.58,
      springStiffness: 14.0,
      springDamping: 6.2,
      glowLerp: 10.0,
    };

    // Fixed physics timestep for stability (120 Hz internal tick)
    const PHYSICS_DT = 1 / 120;
    const MAX_SUBSTEPS = 6; // Cap to prevent spiral-of-death on long frames
    let physicsAccumulator = 0;

    // ── Neon Blue (#1F51FF) Color Palette ──
    const palette = {
      bgDeep: "#03050f",
      glowCore: [200, 220, 255],
      glowMid: [31, 81, 255],
      glowOuter: [15, 40, 180],
      tileBase: [16, 24, 48],
      tileHighlight: [36, 52, 88],
      tileShadow: [6, 10, 24],
      sideLit: [26, 40, 72],
      sideMid: [12, 20, 40],
      sideDark: [5, 8, 18],
    };

    // ── Engine State ──
    let width = 0,
      height = 0,
      dpr = 1;
    let hexGrid = [];
    let ripples = [];
    let animationId = null;
    let lastFrameTime = 0;
    let simTime = 0; // Monotonic simulation clock (seconds)

    // Pre-allocated scratch arrays
    const _basePts = Array.from({ length: 6 }, () => ({ x: 0, y: 0 }));
    const _topPts = Array.from({ length: 6 }, () => ({ x: 0, y: 0 }));
    const _innerPts = Array.from({ length: 6 }, () => ({ x: 0, y: 0 }));

    // Ripple pool
    const RIPPLE_POOL_SIZE = 20;
    const ripplePool = Array.from({ length: RIPPLE_POOL_SIZE }, () => ({
      x: 0, y: 0, radius: 0, maxRadius: 0, strength: 0, active: false,
    }));

    function acquireRipple(x, y, maxRadius) {
      for (let i = 0; i < ripplePool.length; i++) {
        if (!ripplePool[i].active) {
          const r = ripplePool[i];
          r.x = x; r.y = y; r.radius = 0;
          r.maxRadius = maxRadius; r.strength = 1.0; r.active = true;
          ripples.push(r);
          return r;
        }
      }
      const r = { x, y, radius: 0, maxRadius, strength: 1.0, active: true };
      ripples.push(r);
      return r;
    }

    // Precompute flat-top hexagon unit vectors
    const unitVertices = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      unitVertices.push({ cos: Math.cos(angle), sin: Math.sin(angle) });
    }

    // Pointer state (smoothed)
    const pointer = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };

    // ── Deterministic hash ──
    function hash2D(col, row) {
      const h = Math.sin(col * 127.1 + row * 311.7) * 43758.5453123;
      return h - Math.floor(h);
    }

    // ── Grid Init ──
    function initGrid() {
      hexGrid = [];
      const R = config.hexRadius;
      const colStep = R * 1.5;
      const rowStep = R * Math.sqrt(3);
      const cols = Math.ceil(width / colStep) + 4;
      const rows = Math.ceil(height / rowStep) + 4;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const x = col * colStep;
          const y = row * rowStep + (col & 1 ? rowStep * 0.5 : 0);
          const rand1 = hash2D(col, row);
          const rand2 = hash2D(row + 19, col - 7);
          const rand3 = hash2D(col * 3, row * 5);

          let tierBias = 0;
          if (rand2 > 0.72) tierBias = 0.35;
          else if (rand2 < 0.25) tierBias = -0.25;

          hexGrid.push({
            col, row,
            baseX: x, baseY: y,
            phase: rand1 * Math.PI * 2,
            freq: 0.65 + rand2 * 0.85,
            tierBias,
            energyPhase: rand3 * Math.PI * 2,
            elevation: 0,
            velocity: 0,
            glow: 0,
            sortKey: 0,
            normX: Math.max(0, Math.min(1, x / (width || 1))),
            normY: Math.max(0, Math.min(1, y / (height || 1))),
          });
        }
      }
    }

    // ── Resize (debounced) ──
    let resizeTimer = 0;
    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initGrid();
    }

    // ── Color Helpers ──
    function rgbStr(r, g, b, a) {
      if (a === undefined || a >= 1) return `rgb(${r | 0},${g | 0},${b | 0})`;
      return `rgba(${r | 0},${g | 0},${b | 0},${a < 0 ? 0 : a.toFixed(3)})`;
    }

    function lerpColor(c1, c2, t) {
      return [
        c1[0] + (c2[0] - c1[0]) * t,
        c1[1] + (c2[1] - c1[1]) * t,
        c1[2] + (c2[2] - c1[2]) * t,
      ];
    }

    // ── 3D Hex Renderer ──
    function drawHexagon3D(cell) {
      const R = config.hexRadius - config.gap;
      const innerR = R * 0.86;
      const elev = cell.elevation;
      const topX = cell.baseX + elev * config.extrudeDirX;
      const topY = cell.baseY + elev * config.extrudeDirY;

      for (let i = 0; i < 6; i++) {
        const u = unitVertices[i];
        _basePts[i].x = cell.baseX + u.cos * R;
        _basePts[i].y = cell.baseY + u.sin * R;
        _topPts[i].x = topX + u.cos * R;
        _topPts[i].y = topY + u.sin * R;
        _innerPts[i].x = topX + u.cos * innerR;
        _innerPts[i].y = topY + u.sin * innerR;
      }

      const glowAmt = Math.min(1.35, cell.glow * config.glowIntensity);

      // 1. NEON CREVICE GLOW
      if (glowAmt > 0.08) {
        const glowAlpha = Math.min(1, glowAmt * 0.85);
        const rimColor = lerpColor(palette.glowMid, palette.glowCore, Math.min(1, glowAmt * 0.65));

        ctx.beginPath();
        ctx.moveTo(_basePts[0].x, _basePts[0].y);
        for (let i = 1; i < 6; i++) ctx.lineTo(_basePts[i].x, _basePts[i].y);
        ctx.closePath();

        ctx.strokeStyle = rgbStr(palette.glowOuter[0], palette.glowOuter[1], palette.glowOuter[2], glowAlpha * 0.3);
        ctx.lineWidth = 6 + glowAmt * 8;
        ctx.stroke();

        ctx.strokeStyle = rgbStr(palette.glowMid[0], palette.glowMid[1], palette.glowMid[2], glowAlpha * 0.5);
        ctx.lineWidth = 3 + glowAmt * 4;
        ctx.stroke();

        ctx.strokeStyle = rgbStr(rimColor[0], rimColor[1], rimColor[2], glowAlpha);
        ctx.lineWidth = 2.2 + glowAmt * 2;
        ctx.stroke();

        if (glowAmt > 0.45) {
          ctx.strokeStyle = rgbStr(palette.glowCore[0], palette.glowCore[1], palette.glowCore[2], (glowAmt - 0.4) * 1.1);
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }
      }

      // 2. 3D SIDE WALLS
      if (elev > 1.2) {
        const visibleSides = [1, 2, 3];
        const sideShades = [palette.sideDark, palette.sideMid, palette.sideLit];

        for (let idx = 0; idx < visibleSides.length; idx++) {
          const i = visibleSides[idx];
          const next = (i + 1) % 6;

          ctx.beginPath();
          ctx.moveTo(_topPts[i].x, _topPts[i].y);
          ctx.lineTo(_topPts[next].x, _topPts[next].y);
          ctx.lineTo(_basePts[next].x, _basePts[next].y);
          ctx.lineTo(_basePts[i].x, _basePts[i].y);
          ctx.closePath();

          const bounce = Math.min(0.55, glowAmt * 0.38);
          const wallColor = lerpColor(sideShades[idx], palette.glowOuter, bounce);
          ctx.fillStyle = rgbStr(wallColor[0], wallColor[1], wallColor[2]);
          ctx.fill();

          ctx.strokeStyle = "rgba(4,9,15,0.75)";
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // 3. BEVEL FACETS
      const lightFactor = cell.normX * 0.65 + (1 - cell.normY) * 0.35;
      const heightFactor = Math.min(1, elev / (config.maxElevation || 1));
      let capRGB = lerpColor(palette.tileShadow, palette.tileBase, 0.35 + heightFactor * 0.65);
      capRGB = lerpColor(capRGB, palette.tileHighlight, lightFactor * 0.55);
      const bevelMultipliers = [1.22, 0.74, 0.68, 0.88, 1.18, 1.34];

      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        ctx.beginPath();
        ctx.moveTo(_topPts[i].x, _topPts[i].y);
        ctx.lineTo(_topPts[next].x, _topPts[next].y);
        ctx.lineTo(_innerPts[next].x, _innerPts[next].y);
        ctx.lineTo(_innerPts[i].x, _innerPts[i].y);
        ctx.closePath();

        const mult = bevelMultipliers[i];
        let bevelRGB = [
          Math.min(255, capRGB[0] * mult),
          Math.min(255, capRGB[1] * mult),
          Math.min(255, capRGB[2] * mult),
        ];
        if ((i === 1 || i === 2) && glowAmt > 0.35) {
          bevelRGB = lerpColor(bevelRGB, palette.glowMid, (glowAmt - 0.35) * 0.45);
        }
        ctx.fillStyle = rgbStr(bevelRGB[0], bevelRGB[1], bevelRGB[2]);
        ctx.fill();
      }

      // 4. TOP CAP
      ctx.beginPath();
      ctx.moveTo(_innerPts[0].x, _innerPts[0].y);
      for (let i = 1; i < 6; i++) ctx.lineTo(_innerPts[i].x, _innerPts[i].y);
      ctx.closePath();

      const grad = ctx.createLinearGradient(
        topX + innerR * 0.8, topY - innerR * 0.8,
        topX - innerR * 0.8, topY + innerR * 0.8
      );
      const topLit = [
        Math.min(255, capRGB[0] * 1.16),
        Math.min(255, capRGB[1] * 1.16),
        Math.min(255, capRGB[2] * 1.16),
      ];
      const topShade = [capRGB[0] * 0.84, capRGB[1] * 0.84, capRGB[2] * 0.84];
      grad.addColorStop(0, rgbStr(topLit[0], topLit[1], topLit[2]));
      grad.addColorStop(1, rgbStr(topShade[0], topShade[1], topShade[2]));
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = `rgba(180,210,255,${(0.04 + lightFactor * 0.08 + heightFactor * 0.05).toFixed(3)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 5. SPECULAR EDGE
      if (glowAmt > 0.38 && elev > config.maxElevation * 0.25) {
        ctx.beginPath();
        ctx.moveTo(_topPts[0].x, _topPts[0].y);
        ctx.lineTo(_topPts[1].x, _topPts[1].y);
        ctx.lineTo(_topPts[2].x, _topPts[2].y);
        ctx.lineTo(_topPts[3].x, _topPts[3].y);

        const edgeHL = lerpColor(palette.glowMid, palette.glowCore, 0.5);
        ctx.strokeStyle = rgbStr(edgeHL[0], edgeHL[1], edgeHL[2], (glowAmt - 0.35) * 0.85);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }

    // ── Fixed-Step Physics Update ──
    function updatePhysics(time) {
      const stiffness = config.springStiffness;
      const damping = config.springDamping;
      const glowLerpRate = config.glowLerp;
      const maxElev = config.maxElevation;
      const maxElevClamped = maxElev * 1.6;
      const interactionRadius = config.hexRadius * 4.8;
      const interactionRadiusSq = interactionRadius * interactionRadius;
      const ptrActive = pointer.active;
      const ptrX = pointer.x;
      const ptrY = pointer.y;
      const dt = PHYSICS_DT;

      for (let i = 0; i < hexGrid.length; i++) {
        const cell = hexGrid[i];

        // ── Compute target elevation from organic waves ──
        const wave1 = Math.sin(cell.baseX * 0.0045 + cell.baseY * 0.0035 - time * 1.15 + cell.phase);
        const wave2 = Math.cos(cell.baseX * 0.0025 - cell.baseY * 0.0055 + time * 0.85);
        const piston = Math.sin(time * cell.freq + cell.phase);

        let rawHeight = wave1 * 0.38 + wave2 * 0.27 + piston * 0.35 + cell.tierBias;
        let normHeight = Math.max(0, Math.min(1, (rawHeight + 0.75) / 1.55));
        // Smoothstep S-curve
        normHeight = normHeight * normHeight * (3 - 2 * normHeight);

        // Traveling energy veins
        const veinWave = Math.sin(cell.baseX * 0.007 - cell.baseY * 0.006 + time * 1.8 + cell.energyPhase);
        const veinPulse = veinWave > 0 ? veinWave * veinWave * veinWave : 0;

        let targetElev = normHeight * maxElev;
        let targetGlow = 0.18 + normHeight * 0.65 + veinPulse * 0.55;

        // ── Mouse proximity interaction ──
        if (ptrActive) {
          const dx = cell.baseX - ptrX;
          const dy = cell.baseY - ptrY;
          const distSq = dx * dx + dy * dy;
          if (distSq < interactionRadiusSq) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / interactionRadius;
            const falloff2 = falloff * falloff;
            targetElev += falloff2 * (maxElev * 0.65);
            targetGlow += falloff2 * 0.95;
          }
        }

        // ── Shockwave ripples ──
        for (let rIdx = 0; rIdx < ripples.length; rIdx++) {
          const r = ripples[rIdx];
          const dx = cell.baseX - r.x;
          const dy = cell.baseY - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const band = Math.abs(dist - r.radius);
          const bandWidth = config.hexRadius * 2.4;
          if (band < bandWidth) {
            const pulse = (1 - band / bandWidth) * r.strength;
            targetElev += pulse * maxElev * 0.9;
            targetGlow += pulse * 1.25;
          }
        }

        // ── Semi-implicit Euler spring-damper (more stable than explicit) ──
        const displacement = cell.elevation - targetElev;
        const accel = -stiffness * displacement - damping * cell.velocity;
        cell.velocity += accel * dt;
        cell.elevation += cell.velocity * dt;

        // Clamp
        if (cell.elevation < 0) {
          cell.elevation = 0;
          if (cell.velocity < 0) cell.velocity *= -0.15; // Slight bounce
        } else if (cell.elevation > maxElevClamped) {
          cell.elevation = maxElevClamped;
          if (cell.velocity > 0) cell.velocity *= -0.1;
        }

        // ── Exponential glow smoothing ──
        cell.glow += (targetGlow - cell.glow) * Math.min(1, glowLerpRate * dt);

        // ── Sort key for painter's algorithm ──
        cell.sortKey = cell.baseY - cell.baseX * 0.55 - cell.elevation * 0.4;
      }
    }

    // ── Animation Loop ──
    function animate(now) {
      animationId = requestAnimationFrame(animate);

      if (lastFrameTime === 0) lastFrameTime = now;
      const rawDt = (now - lastFrameTime) * 0.001;
      const frameDt = Math.min(rawDt, 0.1); // Cap at 100ms to prevent huge jumps
      lastFrameTime = now;

      // ── Smooth pointer interpolation (frame-rate independent) ──
      if (pointer.active) {
        const pSmooth = 1 - Math.exp(-14 * frameDt);
        pointer.x += (pointer.targetX - pointer.x) * pSmooth;
        pointer.y += (pointer.targetY - pointer.y) * pSmooth;
      } else {
        const pDecay = 1 - Math.exp(-3 * frameDt);
        pointer.x += (-9999 - pointer.x) * pDecay;
        pointer.y += (-9999 - pointer.y) * pDecay;
      }

      // ── Update ripples ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 600 * frameDt * Math.max(0.6, config.speed);
        r.strength = 1 - r.radius / r.maxRadius;
        if (r.strength <= 0) {
          r.active = false;
          ripples.splice(i, 1);
        }
      }

      // ── Fixed-step physics sub-stepping ──
      physicsAccumulator += frameDt;
      let steps = 0;
      while (physicsAccumulator >= PHYSICS_DT && steps < MAX_SUBSTEPS) {
        simTime += PHYSICS_DT * config.speed;
        updatePhysics(simTime);
        physicsAccumulator -= PHYSICS_DT;
        steps++;
      }
      // Drain leftover to avoid accumulation spiral
      if (physicsAccumulator > PHYSICS_DT * MAX_SUBSTEPS) {
        physicsAccumulator = 0;
      }

      // ── Clear with background ──
      ctx.fillStyle = palette.bgDeep;
      ctx.fillRect(0, 0, width, height);

      // Ambient under-grid glow
      const bgGrad = ctx.createRadialGradient(
        width * 0.55, height * 0.45, 50,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, rgbStr(
        palette.glowOuter[0], palette.glowOuter[1], palette.glowOuter[2],
        0.22 * config.glowIntensity
      ));
      bgGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Sort for painter's algorithm ──
      hexGrid.sort((a, b) => b.sortKey - a.sortKey);

      // ── Render visible hexagons (viewport culling) ──
      const margin = config.hexRadius * 2 + config.maxElevation;
      for (let i = 0; i < hexGrid.length; i++) {
        const cell = hexGrid[i];
        if (
          cell.baseX > -margin && cell.baseX < width + margin &&
          cell.baseY > -margin && cell.baseY < height + margin
        ) {
          drawHexagon3D(cell);
        }
      }
    }

    // ── Event Handlers ──
    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onPointerDown(e) {
      const rect = canvas.getBoundingClientRect();
      acquireRipple(
        e.clientX - rect.left,
        e.clientY - rect.top,
        Math.max(width, height) * 0.85
      );
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 80);
    }

    // ── Start / Stop ──
    function start() {
      resizeCanvas();
      lastFrameTime = 0;
      simTime = 0;
      physicsAccumulator = 0;
      animationId = requestAnimationFrame(animate);

      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("resize", onResize);
    }

    function stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      clearTimeout(resizeTimer);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    }

    if (motionEnabled) {
      start();
    } else {
      // Draw a single static frame
      resizeCanvas();
      simTime = 0;
      // Run several physics steps to let springs settle into a natural pose
      for (let warmup = 0; warmup < 30; warmup++) {
        updatePhysics(warmup * PHYSICS_DT * config.speed);
      }
      ctx.fillStyle = palette.bgDeep;
      ctx.fillRect(0, 0, width, height);
      hexGrid.sort((a, b) => b.sortKey - a.sortKey);
      for (let i = 0; i < hexGrid.length; i++) {
        drawHexagon3D(hexGrid[i]);
      }
    }

    return () => { stop(); };
  }, [motionEnabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
