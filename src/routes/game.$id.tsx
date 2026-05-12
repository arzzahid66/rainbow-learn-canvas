import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { GAME_TITLES, STUDENTS, avatar } from "@/lib/data";
import { Star, Heart } from "lucide-react";

export const Route = createFileRoute("/game/$id")({ component: GamePlay });

function GamePlay() {
  const { id } = Route.useParams();
  const { t, lang } = useApp();
  const g = GAME_TITLES[(parseInt(id) - 1) % GAME_TITLES.length];
  const creator = STUDENTS[parseInt(id) % STUDENTS.length];
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.nav.games, to: "/games" }, { label: g[lang] }]} />
      <h1 className="text-4xl font-extrabold mb-6">{g.emoji} {g[lang]}</h1>
      <div className="grid lg:grid-cols-[1fr,320px] gap-6">
        <div className="rounded-3xl bg-gradient-to-br from-sky/30 to-lavender/30 aspect-video flex items-center justify-center text-center p-10 border-4 border-dashed border-border">
          <div>
            <div className="text-8xl mb-4 animate-float">{g.emoji}</div>
            <p className="font-bold text-lg">Game canvas — built by {creator}</p>
            <p className="text-sm text-muted-foreground mt-2">(Game embed placeholder)</p>
            <button className="btn-chunky mt-6">{t.play}</button>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="card-soft p-5">
            <div className="text-sm font-bold mb-2">Description</div>
            <p className="text-sm text-muted-foreground">{lang === "zh" ? "一個融合學習與冒險嘅遊戲，邊玩邊學！" : "A learning adventure where you play and grow."}</p>
            <div className="mt-4 inline-flex items-center text-sunny">{[1,2,3,4].map((s) => <Star key={s} className="w-4 h-4 fill-sunny" />)}<Star className="w-4 h-4" /> <span className="ml-2 text-foreground text-sm font-bold">4.0</span></div>
          </div>
          <div className="card-soft p-5">
            <div className="text-sm font-bold mb-2">Controls</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>⬅️ ➡️ Move</li><li>⬆️ Jump</li><li>SPACE Action</li>
            </ul>
          </div>
          <div className="card-soft p-5 flex items-center gap-3">
            <img src={avatar(creator)} className="w-12 h-12 rounded-full" />
            <div>
              <div className="text-xs text-muted-foreground">Created by</div>
              <div className="font-bold">{creator}</div>
            </div>
          </div>
          <div className="card-soft p-5">
            <div className="text-sm font-bold mb-3">Comments</div>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2"><img src={avatar(STUDENTS[1])} className="w-7 h-7 rounded-full" /><div><div className="font-bold text-xs">{STUDENTS[1]}</div><p>So fun! 🎉</p></div></div>
              <div className="flex gap-2"><img src={avatar(STUDENTS[2])} className="w-7 h-7 rounded-full" /><div><div className="font-bold text-xs">{STUDENTS[2]}</div><p>Level 3 is hard 😅</p></div></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
