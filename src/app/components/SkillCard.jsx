import Image from "next/image";

export default function SkillCard({ icon, name, detail }) {
  return (
    <div className="flex h-full items-center gap-4 rounded-xl border border-[#33353F] bg-[#181818] p-5">
      <Image src={icon} width={48} height={48} className="h-12 w-12 shrink-0 object-contain" alt="" />
      <div className="min-w-0"><h3 className="font-semibold text-white">{name}</h3><p className="mt-1 text-sm text-[#ADB7BE]">{detail}</p></div>
    </div>
  );
}
