import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { Speakable } from "@/components/SpeakButton";
import { Bookmark, Printer } from "lucide-react";
import { avatar, TUTORS } from "@/lib/data";

export const Route = createFileRoute("/note/$id")({ component: NoteDetail });

function NoteDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useApp();
  const author = TUTORS[0];
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.tabs.tutor }, { label: `Note #${id}` }]} />
      <div className="grid lg:grid-cols-[1fr,280px] gap-10">
        <article>
          <div className="inline-block px-3 py-1 rounded-full bg-coral/20 text-coral-foreground text-xs font-bold mb-4">{lang === "zh" ? "數學 · 小三" : "Mathematics · P3"}</div>
          <h1 className="text-4xl font-extrabold mb-3">{lang === "zh" ? "分數一點就明 🍕" : "Fractions Made Easy 🍕"}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
            <img src={avatar(author)} className="w-8 h-8 rounded-full" />
            <span className="font-semibold text-foreground">{author}</span> · 2025-04-12
          </div>

          <div className="prose-content space-y-5">
            <Speakable as="h2" className="text-2xl font-extrabold">{lang === "zh" ? "甚麼是分數？" : "What is a fraction?"}</Speakable>
            <Speakable as="p" className="leading-relaxed text-foreground/90">
              {lang === "zh"
                ? "分數係將一個整體平均分成若干份，其中嘅幾份就係分數。例如將一塊薄餅切成 8 份，食咗 3 份就係 3/8。"
                : "A fraction shows part of a whole. If a pizza is cut into 8 equal slices and you eat 3, you've eaten 3/8 of the pizza."}
            </Speakable>
            <div className="rounded-2xl bg-sunny/20 p-6 text-5xl text-center">🍕 🍕 🍕 🍕 🍕 🍕 🍕 🍕</div>
            <Speakable as="h2" className="text-2xl font-extrabold">{lang === "zh" ? "點樣比較分數？" : "How to compare fractions?"}</Speakable>
            <Speakable as="p" className="leading-relaxed text-foreground/90">
              {lang === "zh" ? "如果分母一樣，分子愈大，分數愈大。" : "When denominators are the same, the bigger numerator means a bigger fraction."}
            </Speakable>
            <pre className="rounded-2xl bg-card border p-4 text-sm overflow-x-auto"><code>{`# Example
3/8  <  5/8  <  7/8`}</code></pre>
          </div>
        </article>

        <aside className="space-y-3">
          <button className="btn-chunky w-full inline-flex items-center justify-center gap-2"><Bookmark className="w-4 h-4" /> {t.save}</button>
          <button className="w-full px-4 py-3 rounded-full font-bold border-2 inline-flex items-center justify-center gap-2 hover:bg-muted"><Printer className="w-4 h-4" /> {t.print}</button>
          <div className="card-soft p-5 mt-6">
            <div className="font-bold mb-3">{t.relatedNotes}</div>
            <div className="space-y-2 text-sm">
              <Link to="/note/$id" params={{ id: "tutor-2" }} className="block hover:text-primary">→ Multiplication Tricks</Link>
              <Link to="/note/$id" params={{ id: "tutor-3" }} className="block hover:text-primary">→ Long Division</Link>
              <Link to="/note/$id" params={{ id: "tutor-4" }} className="block hover:text-primary">→ Decimals 101</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
