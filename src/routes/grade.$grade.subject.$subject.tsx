import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { SUBJECT_BY_SLUG, SUBJECT_META, TUTORS, STUDENTS, SCHOOLS, NOTE_TITLES_EN, NOTE_TITLES_ZH, GAME_TITLES, DISCUSSION_TOPICS, VIDEOS, WEBSITES, avatar, COLOR_BG } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Play, Star, ExternalLink, ShieldCheck, Clock } from "lucide-react";
import { SpeakButton } from "@/components/SpeakButton";

export const Route = createFileRoute("/grade/$grade/subject/$subject")({
  component: SubjectPage,
  loader: ({ params }) => {
    const m = params.grade.match(/^primary-([1-6])$/);
    const subjKey = SUBJECT_BY_SLUG[params.subject];
    if (!m || !subjKey) throw notFound();
    return { num: parseInt(m[1], 10), subjKey };
  },
});

function SubjectPage() {
  const { num, subjKey } = Route.useLoaderData();
  const { t, lang } = useApp();
  const meta = SUBJECT_META[subjKey];
  const subjName = (t.subjects as any)[subjKey];
  const isLower = num <= 3;
  const titles = lang === "zh" ? NOTE_TITLES_ZH : NOTE_TITLES_EN;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[
        { label: isLower ? t.sections.lower : t.sections.upper, to: `/section/${isLower ? "lower-primary" : "upper-primary"}` },
        { label: `${t.grade.p}${num}`, to: `/grade/primary-${num}` },
        { label: subjName },
      ]} />

      <div className={`rounded-3xl p-8 mb-8 border-2 ${COLOR_BG[meta.color]} flex items-center gap-6`}>
        <div className="text-7xl">{meta.emoji}</div>
        <div>
          <h1 className="text-4xl font-extrabold inline-flex items-center gap-2">{subjName}<SpeakButton text={subjName} /></h1>
          <p className="text-muted-foreground mt-1">{t.grade.p}{num} · 6 modules · {t.grade.complete} 65%</p>
        </div>
      </div>

      <Tabs defaultValue="tutor" className="w-full">
        <TabsList className="flex flex-wrap h-auto bg-muted/50 p-2 rounded-2xl gap-1 mb-6">
          <TabsTrigger value="tutor" className="rounded-xl text-sm font-bold px-4 py-2.5">👨‍🏫 {t.tabs.tutor}</TabsTrigger>
          <TabsTrigger value="student" className="rounded-xl text-sm font-bold px-4 py-2.5">🎒 {t.tabs.student}</TabsTrigger>
          <TabsTrigger value="videos" className="rounded-xl text-sm font-bold px-4 py-2.5">🎬 {t.tabs.videos}</TabsTrigger>
          <TabsTrigger value="websites" className="rounded-xl text-sm font-bold px-4 py-2.5">🔗 {t.tabs.websites}</TabsTrigger>
          <TabsTrigger value="discussion" className="rounded-xl text-sm font-bold px-4 py-2.5">💬 {t.tabs.discussion}</TabsTrigger>
          <TabsTrigger value="games" className="rounded-xl text-sm font-bold px-4 py-2.5">🎮 {t.tabs.games}</TabsTrigger>
        </TabsList>

        <TabsContent value="tutor" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Link key={i} to="/note/$id" params={{ id: `tutor-${i+1}` }}>
              <motion.div whileHover={{ y: -4 }} className="card-soft overflow-hidden">
                <div className={`h-32 flex items-center justify-center text-6xl ${COLOR_BG[meta.color]}`}>{meta.emoji}</div>
                <div className="p-4">
                  <div className="font-bold">{titles[i % titles.length]}</div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <img src={avatar(TUTORS[i % TUTORS.length])} className="w-6 h-6 rounded-full" />
                    {TUTORS[i % TUTORS.length]}
                    <Badge variant="secondary" className="ml-auto"><ShieldCheck className="w-3 h-3 mr-1" />{t.verified}</Badge>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="student">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-5">
            <p className="text-sm text-muted-foreground">{t.upload.review}</p>
            <Link to="/upload/note" className="btn-chunky">{t.upload.btn}</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link key={i} to="/note/$id" params={{ id: `student-${i+1}` }}>
                <motion.div whileHover={{ y: -4 }} className="card-soft overflow-hidden">
                  <div className={`h-32 flex items-center justify-center text-6xl bg-gradient-to-br from-sunny/30 to-coral/30`}>{meta.emoji}</div>
                  <div className="p-4">
                    <div className="font-bold">{titles[(i+2) % titles.length]}</div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <img src={avatar(STUDENTS[i % STUDENTS.length])} className="w-6 h-6 rounded-full" />
                      {STUDENTS[i % STUDENTS.length]} · {SCHOOLS[i % SCHOOLS.length]}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Badge className="bg-mint/30 text-mint-foreground border-mint/40 hover:bg-mint/40">✓ {t.approved}</Badge>
                      <span className="text-xs flex items-center gap-1"><Heart className="w-3 h-3 text-coral" /> {12 + i * 7}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
            <div className="card-soft overflow-hidden border-2 border-dashed border-sunny">
              <div className="h-32 flex items-center justify-center text-6xl bg-sunny/20">⏳</div>
              <div className="p-4">
                <div className="font-bold">My Draft Note</div>
                <div className="mt-3 inline-flex"><Badge className="bg-sunny/30 text-sunny-foreground border-sunny/50 hover:bg-sunny/40"><Clock className="w-3 h-3 mr-1" />{t.pending}</Badge></div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIDEOS.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="card-soft overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-sky/40 to-lavender/40 flex items-center justify-center text-7xl">
                🎬
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center"><Play className="w-6 h-6 text-coral fill-coral ml-1" /></div>
                </div>
                <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{v.dur}</Badge>
              </div>
              <div className="p-4">
                <div className="font-bold">{v.title[lang]}</div>
                <div className="text-xs text-muted-foreground mt-1">{v.src} · {v.views} views</div>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="websites" className="space-y-3">
          {WEBSITES.map((w, i) => (
            <motion.a key={i} whileHover={{ x: 4 }} href="#" className="flex items-center gap-4 card-soft p-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint/40 to-sky/40 flex items-center justify-center text-2xl">🌐</div>
              <div className="flex-1">
                <div className="font-bold">{w.title}</div>
                <div className="text-xs text-muted-foreground">{w.url} · {w.desc[lang]}</div>
              </div>
              <span className="text-primary font-bold inline-flex items-center gap-1">{t.visit} <ExternalLink className="w-4 h-4" /></span>
            </motion.a>
          ))}
        </TabsContent>

        <TabsContent value="discussion">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <div className="flex gap-2">
              {["Newest", "Most Liked", "Unanswered"].map((c) => (
                <button key={c} className="px-3 py-1.5 rounded-full text-xs font-bold bg-muted hover:bg-primary hover:text-primary-foreground transition">{c}</button>
              ))}
            </div>
            <Link to="/upload/note" className="btn-chunky text-sm">{t.newPost}</Link>
          </div>
          <p className="text-xs text-muted-foreground mb-4">{t.postReview}</p>
          <div className="space-y-3">
            {DISCUSSION_TOPICS.map((d, i) => (
              <Link key={i} to="/discussion/$id" params={{ id: String(i + 1) }}>
                <motion.div whileHover={{ y: -2 }} className="card-soft p-4 flex gap-4">
                  <img src={avatar(STUDENTS[i % STUDENTS.length])} className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold">{d[lang]}</div>
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
        </TabsContent>

        <TabsContent value="games">
          <div className="flex justify-end mb-4"><button className="btn-chunky text-sm">{t.submitGame}</button></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GAME_TITLES.map((g, i) => (
              <Link key={i} to="/game/$id" params={{ id: String(i + 1) }}>
                <motion.div whileHover={{ y: -4 }} className="card-soft overflow-hidden">
                  <div className={`h-40 flex items-center justify-center text-7xl bg-gradient-to-br ${["from-coral/40 to-sunny/40","from-sky/40 to-lavender/40","from-mint/40 to-sky/40","from-sunny/40 to-mint/40","from-lavender/40 to-coral/40","from-sky/40 to-mint/40"][i % 6]}`}>{g.emoji}</div>
                  <div className="p-4">
                    <div className="font-bold">{g[lang]}</div>
                    <div className="text-xs text-muted-foreground mt-1">by {STUDENTS[i % STUDENTS.length]} · {1000 + i * 234} plays</div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-flex items-center text-sunny"><Star className="w-3.5 h-3.5 fill-sunny" /><Star className="w-3.5 h-3.5 fill-sunny" /><Star className="w-3.5 h-3.5 fill-sunny" /><Star className="w-3.5 h-3.5 fill-sunny" /><Star className="w-3.5 h-3.5" /></span>
                      <span className="text-xs font-bold text-primary">{t.play}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
