import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { DISCUSSION_TOPICS, STUDENTS, avatar } from "@/lib/data";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/discussion/")({ component: DiscussionList });

function DiscussionList() {
  const { t, lang } = useApp();
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.nav.discussion }]} />
      <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
        <h1 className="text-4xl font-extrabold">💬 {t.nav.discussion}</h1>
        <button className="btn-chunky text-sm">{t.newPost}</button>
      </div>
      <p className="text-xs text-muted-foreground mb-6">{t.postReview}</p>
      <div className="space-y-3">
        {DISCUSSION_TOPICS.map((d, i) => (
          <Link key={i} to="/discussion/$id" params={{ id: String(i + 1) }}>
            <motion.div whileHover={{ y: -2 }} className="card-soft p-5 flex gap-4">
              <img src={avatar(STUDENTS[i % STUDENTS.length])} className="w-12 h-12 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg">{d[lang]}</div>
                <div className="text-xs text-muted-foreground mt-1">{STUDENTS[i % STUDENTS.length]} · 2 days ago</div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {3 + i * 4}</span>
                <span className="inline-flex items-center gap-1"><Heart className="w-3 h-3 text-coral" /> {7 + i * 3}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
