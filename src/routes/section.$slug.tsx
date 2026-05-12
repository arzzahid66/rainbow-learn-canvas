import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/section/$slug")({
  component: SectionPage,
  loader: ({ params }) => {
    if (params.slug !== "lower-primary" && params.slug !== "upper-primary") throw notFound();
    return { slug: params.slug };
  },
});

function SectionPage() {
  const { slug } = Route.useLoaderData();
  const { t } = useApp();
  const isLower = slug === "lower-primary";
  const grades = isLower ? [1, 2, 3] : [4, 5, 6];
  const mascots = ["🐣", "🐥", "🦄", "🦊", "🦉", "🐲"];
  const colors = ["mint", "sunny", "coral", "sky", "lavender", "coral"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: isLower ? t.sections.lower : t.sections.upper }]} />

      <div className={`rounded-3xl p-10 mb-10 bg-gradient-to-br ${isLower ? "from-mint/40 to-sunny/40" : "from-sky/40 to-lavender/40"} flex items-center justify-between flex-wrap gap-6`}>
        <div>
          <h1 className="text-4xl font-extrabold">{isLower ? t.sections.lower : t.sections.upper}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{isLower ? t.sections.lowerDesc : t.sections.upperDesc}</p>
        </div>
        <div className="text-8xl animate-float">{isLower ? "🌱" : "🌳"}</div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {grades.map((g, i) => (
          <Link key={g} to="/grade/$grade" params={{ grade: `primary-${g}` }}>
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="card-soft p-8 text-center" style={{ background: `oklch(from var(--${colors[(i + (isLower ? 0 : 3)) % 6]}) l c h / 0.2)` }}>
              <div className="text-7xl mb-2">{mascots[g - 1]}</div>
              <div className="text-6xl font-extrabold font-display">{`P${g}`}</div>
              <div className="mt-3 text-sm font-semibold text-muted-foreground">{t.grade.enter}</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
