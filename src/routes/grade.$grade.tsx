import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { SUBJECTS_LOWER, SUBJECTS_UPPER, SUBJECT_META, COLOR_BG } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/grade/$grade")({
  component: GradePage,
  loader: ({ params }) => {
    const m = params.grade.match(/^primary-([1-6])$/);
    if (!m) throw notFound();
    return { num: parseInt(m[1], 10) };
  },
});

function GradePage() {
  const { num } = Route.useLoaderData();
  const { t } = useApp();
  const isLower = num <= 3;
  const subjects = isLower ? SUBJECTS_LOWER : SUBJECTS_UPPER;
  const sectionLabel = isLower ? t.sections.lower : t.sections.upper;
  const sectionSlug = isLower ? "lower-primary" : "upper-primary";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: sectionLabel, to: `/section/${sectionSlug}` }, { label: `${t.grade.p}${num}` }]} />

      <div className={`rounded-3xl p-10 mb-10 ${isLower ? "bg-gradient-to-r from-mint/40 to-sunny/30" : "bg-gradient-to-r from-sky/40 to-lavender/30"} flex items-center gap-6`}>
        <div className="text-8xl">{["🐣","🐥","🦄","🦊","🦉","🐲"][num-1]}</div>
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{sectionLabel}</div>
          <h1 className="text-5xl font-extrabold">{t.grade.p}{num}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {subjects.map((s, i) => {
          const meta = SUBJECT_META[s];
          const pct = 30 + ((i * 17) % 65);
          return (
            <Link key={s} to="/grade/$grade/subject/$subject" params={{ grade: `primary-${num}`, subject: meta.slug }}>
              <motion.div whileHover={{ y: -5 }} className={`card-soft p-5 border-2 ${COLOR_BG[meta.color]}`}>
                <div className="text-5xl mb-3">{meta.emoji}</div>
                <div className="font-extrabold">{(t.subjects as any)[s]}</div>
                <div className="mt-3">
                  <Progress value={pct} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">{pct}% {t.grade.complete}</div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
