import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { STUDENTS, avatar } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({ component: Admin });

const PENDING_NOTES = [
  { title: "Phonics Fun Vol. 2", who: STUDENTS[0], grade: "P2", subject: "English" },
  { title: "圖解水循環", who: STUDENTS[1], grade: "P4", subject: "Science" },
  { title: "心算秘技", who: STUDENTS[2], grade: "P3", subject: "Math" },
];

function Admin() {
  const { t } = useApp();
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.admin }]} />
      <h1 className="text-4xl font-extrabold mb-6">🛡️ {t.admin}</h1>
      <div className="grid lg:grid-cols-[220px,1fr] gap-6">
        <aside className="space-y-1">
          {["Pending Notes","Pending Posts","Pending Games","Users","Reports"].map((s, i) => (
            <button key={s} className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold ${i===0 ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{s}</button>
          ))}
        </aside>
        <div className="card-soft p-6">
          <Tabs defaultValue="notes">
            <TabsList className="rounded-2xl mb-4">
              <TabsTrigger value="notes" className="rounded-xl">Notes (3)</TabsTrigger>
              <TabsTrigger value="posts" className="rounded-xl">Posts (5)</TabsTrigger>
              <TabsTrigger value="games" className="rounded-xl">Games (2)</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-xs uppercase text-muted-foreground border-b">
                    <th className="py-3">Title</th><th>Author</th><th>Grade</th><th>Subject</th><th>Status</th><th></th>
                  </tr></thead>
                  <tbody>
                    {PENDING_NOTES.map((n) => (
                      <tr key={n.title} className="border-b last:border-0">
                        <td className="py-4 font-bold">{n.title}</td>
                        <td><span className="inline-flex items-center gap-2"><img src={avatar(n.who)} className="w-6 h-6 rounded-full" />{n.who}</span></td>
                        <td>{n.grade}</td>
                        <td>{n.subject}</td>
                        <td><Badge className="bg-sunny/30 text-sunny-foreground border-sunny/40 hover:bg-sunny/40">Pending</Badge></td>
                        <td className="text-right">
                          <div className="inline-flex gap-1">
                            <button onClick={() => toast.success("Approved!")} className="p-1.5 rounded-lg bg-mint/30 hover:bg-mint/50"><Check className="w-4 h-4" /></button>
                            <button onClick={() => toast("Rejected")} className="p-1.5 rounded-lg bg-coral/20 hover:bg-coral/40"><X className="w-4 h-4" /></button>
                            <button className="p-1.5 rounded-lg bg-muted hover:bg-muted/70"><Eye className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="posts"><p className="text-muted-foreground p-8 text-center">5 pending posts...</p></TabsContent>
            <TabsContent value="games"><p className="text-muted-foreground p-8 text-center">2 pending games...</p></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
