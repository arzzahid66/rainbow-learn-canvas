import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Gamepad2, Accessibility, Globe2 } from "lucide-react";
import { Speakable, SpeakButton } from "@/components/SpeakButton";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = useApp();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sunny/30 via-coral/20 to-lavender/30" />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-mint/40 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-sky/40 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="fancy-link">{t.hero.title}</span>
            </motion.h1>
            <p className="mt-6 text-lg text-muted-foreground inline-flex items-start gap-2">
              {t.hero.subtitle}
              <SpeakButton text={t.hero.subtitle} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/section/lower-primary" className="btn-chunky">{t.hero.cta} ✨</Link>
              <Link to="/discussion" className="px-6 py-3 rounded-full font-bold border-2 border-foreground/10 hover:border-primary hover:text-primary transition">{t.nav.discussion}</Link>
            </div>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-[3rem] bg-gradient-to-br from-sky via-lavender to-coral p-1 shadow-2xl">
              <div className="w-full h-full rounded-[2.8rem] bg-card flex items-center justify-center text-[10rem]">
                📚
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-6xl animate-float">🌈</div>
            <div className="absolute -bottom-2 -left-4 text-5xl animate-float" style={{ animationDelay: "1s" }}>🎨</div>
          </motion.div>
        </div>
      </section>

      {/* Section cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        <SectionCard to="/section/lower-primary" title={t.sections.lower} desc={t.sections.lowerDesc} emoji="🌱" gradient="from-mint/40 to-sunny/40" />
        <SectionCard to="/section/upper-primary" title={t.sections.upper} desc={t.sections.upperDesc} emoji="🌳" gradient="from-sky/40 to-lavender/40" />
      </section>

      {/* Why */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold mb-8 text-center">{t.why.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={<Accessibility />} title={t.why.a} desc={t.why.aDesc} color="coral" />
          <Feature icon={<Globe2 />} title={t.why.b} desc={t.why.bDesc} color="sky" />
          <Feature icon={<Gamepad2 />} title={t.why.c} desc={t.why.cDesc} color="lavender" />
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2"><Sparkles className="text-coral" /> {t.trending}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: "🍕", title: "Fractions Made Easy", tag: "Math · Note" },
            { emoji: "🚀", title: "Spelling Space Adventure", tag: "Game" },
            { emoji: "🌞", title: "Solar System Tour", tag: "Video" },
            { emoji: "🐉", title: "成語接龍挑戰", tag: "Game" },
          ].map((c) => (
            <motion.div key={c.title} whileHover={{ y: -4 }} className="card-soft p-5">
              <div className="text-5xl">{c.emoji}</div>
              <div className="mt-3 font-bold">{c.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-coral via-sunny to-mint p-8 text-center text-white shadow-xl">
          <div className="grid sm:grid-cols-3 gap-6 font-display font-extrabold">
            <Stat n="12,500" label={t.stats.students} />
            <Stat n="3,200" label={t.stats.notes} />
            <Stat n="480" label={t.stats.games} />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionCard({ to, title, desc, emoji, gradient }: any) {
  return (
    <Link to={to}>
      <motion.div whileHover={{ y: -6, rotate: -0.5 }} className={`card-soft p-8 bg-gradient-to-br ${gradient} h-full`}>
        <div className="text-7xl mb-4">{emoji}</div>
        <h3 className="text-3xl font-extrabold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{desc}</p>
        <div className="mt-6 inline-flex items-center gap-2 font-bold text-primary">{`Explore →`}</div>
      </motion.div>
    </Link>
  );
}

function Feature({ icon, title, desc, color }: any) {
  return (
    <div className="card-soft p-6 border-t-4" style={{ borderTopColor: `var(--${color})` }}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3`} style={{ backgroundColor: `oklch(from var(--${color}) l c h / 0.2)`, color: `var(--${color})` }}>{icon}</div>
      <h3 className="font-extrabold text-lg">{title}</h3>
      <Speakable as="p" className="text-sm text-muted-foreground mt-1">{desc}</Speakable>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-4xl">{n}</div>
      <div className="text-sm font-semibold opacity-90 mt-1">{label}</div>
    </div>
  );
}
