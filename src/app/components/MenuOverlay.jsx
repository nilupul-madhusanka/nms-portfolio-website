import NavLink from "./NavLink";

export default function MenuOverlay({ links, open, onNavigate }) {
  return (
    <div id="mobile-navigation" hidden={!open} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[#33353F] md:hidden">
      <ul className="flex flex-col px-4 py-3">
        {links.map((link) => <li key={link.path}><NavLink href={link.path} title={link.title} onClick={() => onNavigate(link.path)} /></li>)}
      </ul>
    </div>
  );
}
