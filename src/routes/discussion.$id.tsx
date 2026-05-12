import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { STUDENTS, avatar, DISCUSSION_TOPICS } from "@/lib/data";
import { Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/discussion/$id")({ component: DiscussionDetail });

function DiscussionDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useApp();
  const idx = (parseInt(id) - 1) % DISCUSSION_TOPICS.length;
  const topic = DISCUSSION_TOPICS[idx];
  const replies = [
    { who: STUDENTS[1], when: "1d", text: lang === "zh" ? "我用唱歌嘅方式記住，超有效！" : "I sing them as a song — works great!" },
    { who: STUDENTS[2], when: "8h", text: lang === "zh" ? "每日練 5 分鐘就夠。" : "Practice 5 minutes daily, that's enough." },
    { who: STUDENTS[3], when: "2h", text: lang === "zh" ? "可以試吓 flash cards。" : "Try flash cards too." },
  ];
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.nav.discussion, to: "/discussion" }, { label: `#${id}` }]} />
      <div className="card-soft p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <img src={avatar(STUDENTS[0])} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-bold">{STUDENTS[0]}</div>
            <div className="text-xs text-muted-foreground">3 days ago</div>
          </div>
        </div>
        <h1 className="text-2xl font-extrabold mb-3">{topic[lang]}</h1>
        <p className="text-muted-foreground">{lang === "zh" ? "我背書好慢，有冇好嘅方法可以介紹？" : "I memorize slowly. Anyone has a tip to share?"}</p>
      </div>

      <div className="space-y-3 mb-6">
        {replies.map((r, i) => (
          <div key={i} className="card-soft p-4 flex gap-3">
            <img src={avatar(r.who)} className="w-9 h-9 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-bold">{r.who} <span className="text-xs text-muted-foreground font-normal">· {r.when}</span></div>
              <p className="text-sm mt-1">{r.text}</p>
            </div>
            <button className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-coral self-start"><Heart className="w-3 h-3" /> {2 + i * 3}</button>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); toast.success(t.upload.success); }} className="card-soft p-5">
        <p className="text-xs text-muted-foreground mb-3">{t.postReview}</p>
        <Textarea placeholder="Share your reply..." className="rounded-2xl min-h-[100px]" />
        <div className="mt-3 text-right"><button className="btn-chunky text-sm">Reply</button></div>
      </form>
    </div>
  );
}
