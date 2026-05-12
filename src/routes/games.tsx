import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { GAME_TITLES, STUDENTS } from "@/lib/data";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const Route = createFileRoute("/games")({ component: GamesList });

function GamesList() {
  const { t, lang } = useApp();
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.nav.games }]} />
      <div className="flex justify-between items-center flex-wrap gap-3 mb-8">
        <h1 className="text-4xl font-extrabold">🎮 {t.nav.games}</h1>
        <button className="btn-chunky text-sm">{t.submitGame}</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...GAME_TITLES, ...GAME_TITLES].map((g, i) => (
          <Link key={i} to="/game/$id" params={{ id: String((i % GAME_TITLES.length) + 1) }}>
            <motion.div whileHover={{ y: -4 }} className="card-soft overflow-hidden">
              <div className={`h-40 flex items-center justify-center text-7xl bg-gradient-to-br ${["from-coral/40 to-sunny/40","from-sky/40 to-lavender/40","from-mint/40 to-sky/40","from-sunny/40 to-mint/40","from-lavender/40 to-coral/40","from-sky/40 to-mint/40"][i % 6]}`}>{g.emoji}</div>
              <div className="p-4">
                <div className="font-bold">{g[lang]}</div>
                <div className="text-xs text-muted-foreground mt-1">by {STUDENTS[i % STUDENTS.length]} · {1000 + i * 234} plays</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="inline-flex items-center text-sunny">{[1,2,3,4].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-sunny" />)}<Star className="w-3.5 h-3.5" /></span>
                  <span className="text-xs font-bold text-primary">{t.play}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
