import Link from "next/link";

export default function NavLink({ href, title, onClick }) {
  return <Link href={href} onClick={onClick} className="flex min-h-11 items-center rounded-lg px-3 py-2 text-[#ADB7BE] hover:text-white">{title}</Link>;
}
