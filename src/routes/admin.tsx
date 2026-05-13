import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Trash2, Plus, ShieldAlert, FileText } from "lucide-react";
import { STUDENTS, avatar, SUBJECT_META } from "@/lib/data";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { loadAdminNotes, deleteAdminNote, type AdminNote } from "@/lib/auth-store";

export const Route = createFileRoute("/admin")({ component: Admin });

const PENDING_NOTES = [
  { title: "Phonics Fun Vol. 2", who: STUDENTS[0], grade: "P2", subject: "English" },
  { title: "圖解水循環", who: STUDENTS[1], grade: "P4", subject: "Science" },
  { title: "心算秘技", who: STUDENTS[2], grade: "P3", subject: "Math" },
];

function Admin() {
  const { t, isAdmin, user } = useApp();
  const nav = useNavigate();
  const [adminNotes, setAdminNotes] = useState<AdminNote[]>([]);

  useEffect(() => {
    const refresh = () => setAdminNotes(loadAdminNotes());
    refresh();
    window.addEventListener("rl_admin_notes_changed", refresh);
    return () => window.removeEventListener("rl_admin_notes_changed", refresh);
  }, []);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto text-coral mb-3" />
        <h1 className="text-2xl font-extrabold mb-2">Sign in required</h1>
        <Link to="/login" className="btn-chunky">Go to login</Link>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto text-coral mb-3" />
        <h1 className="text-2xl font-extrabold mb-2">Admin only</h1>
        <p className="text-muted-foreground mb-5">You don't have access to the admin panel.</p>
        <button onClick={() => nav({ to: "/" })} className="btn-chunky">Back home</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.admin }]} />
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-4xl font-extrabold">🛡️ {t.admin}</h1>
        <Link to="/upload/note" className="btn-chunky inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Upload Note</Link>
      </div>

      <div className="card-soft p-6">
        <Tabs defaultValue="published">
          <TabsList className="rounded-2xl mb-4 flex-wrap h-auto">
            <TabsTrigger value="published" className="rounded-xl">📚 Published Notes ({adminNotes.length})</TabsTrigger>
            <TabsTrigger value="notes" className="rounded-xl">Pending Notes (3)</TabsTrigger>
            <TabsTrigger value="posts" className="rounded-xl">Pending Posts (5)</TabsTrigger>
            <TabsTrigger value="games" className="rounded-xl">Pending Games (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="published">
            {adminNotes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>No notes uploaded yet. Click <b>Upload Note</b> to publish your first one.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-xs uppercase text-muted-foreground border-b">
                    <th className="py-3">Title</th><th>Section</th><th>Grade</th><th>Subject</th><th>File</th><th></th>
                  </tr></thead>
                  <tbody>
                    {adminNotes.map((n) => (
                      <tr key={n.id} className="border-b last:border-0">
                        <td className="py-4 font-bold">{n.title}<div className="text-xs font-normal text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</div></td>
                        <td className="capitalize">{n.section.replace("-", " ")}</td>
                        <td>P{n.grade}</td>
                        <td className="capitalize">{SUBJECT_META[n.subject]?.emoji} {n.subject}</td>
                        <td className="text-xs text-muted-foreground">{n.fileName || "—"}</td>
                        <td className="text-right">
                          <button onClick={() => { deleteAdminNote(n.id); toast("Deleted"); }} className="p-1.5 rounded-lg bg-coral/20 hover:bg-coral/40"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

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
  );
}
