import { projects } from "../data/portfolio";

export default function AchievementsSection() {
  const stats = [
    { value: projects.length, label: "Projects showcased" },
    { value: "Web", label: "Interfaces & APIs" },
    { value: "Mobile", label: "Flutter applications" },
    { value: "Beyond", label: "Desktop & AI automation" },
  ];
  return (
    <section aria-label="Portfolio at a glance" className="py-8 sm:py-12">
      <dl className="grid grid-cols-2 gap-6 rounded-xl border border-[#33353F] px-4 py-8 text-center lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex min-w-0 flex-col-reverse gap-2">
            <dt className="text-sm text-[#ADB7BE]">{stat.label}</dt>
            <dd className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
