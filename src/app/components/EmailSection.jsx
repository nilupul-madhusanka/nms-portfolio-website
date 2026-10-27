"use client";
import { useState } from "react";
import Image from "next/image";
import { profile } from "../data/portfolio";

export default function EmailSection() {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setStatus("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = formData.subject.trim();
    const message = formData.message.trim();
    if (!subject || !message) {
      setStatus("Please enter a subject and a message.");
      return;
    }
    const body = `Reply to: ${formData.email.trim()}\n\n${message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app was requested. Review and send the draft there. If it didn’t open, email me directly using the address above.");
  };
  const fieldClass = "block w-full rounded-lg border border-[#4b4b58] bg-[#18191E] p-3 text-base text-gray-100 placeholder:text-[#9CA2A9]";

  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-2">
      <div className="min-w-0">
        <h2 id="contact-title" className="mb-5 text-3xl font-bold text-white sm:text-4xl">Let’s Connect</h2>
        <p className="mb-5 max-w-md leading-relaxed text-[#ADB7BE]">Have a project in mind, a question about my work, or an opportunity to share? I’d love to hear from you.</p>
        <a href={`mailto:${profile.email}`} className="inline-block break-all rounded text-purple-300 underline decoration-purple-500/50 underline-offset-4 hover:text-purple-200">{profile.email}</a>
        <div className="mt-6 flex flex-wrap gap-3">
          {profile.socials.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} (opens in new tab)`} className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#33353F] bg-[#181818] hover:border-purple-400">
              <Image src={social.icon} alt="" width={32} height={32} className="h-8 w-8" />
            </a>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="min-w-0 space-y-5" aria-label="Prepare an email" aria-describedby="email-help">
        <p id="email-help" className="text-sm leading-relaxed text-[#ADB7BE]">This form opens a draft in your email app. You’ll review and send it there.</p>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">Your email</label>
          <input className={fieldClass} id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white">Subject</label>
          <input className={fieldClass} id="subject" name="subject" type="text" maxLength={150} required value={formData.subject} onChange={handleChange} placeholder="Let’s work together" />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">Message</label>
          <textarea className={fieldClass} id="message" name="message" rows={5} maxLength={2000} required value={formData.message} onChange={handleChange} placeholder="Tell me about your project…" />
        </div>
        <button type="submit" className="min-h-12 w-full rounded-lg bg-primary-700 px-5 py-3 font-medium text-white hover:bg-primary-800">Open Email Draft</button>
        <p role="status" className="text-sm leading-relaxed text-[#ADB7BE]">{status}</p>
      </form>
    </section>
  );
}
