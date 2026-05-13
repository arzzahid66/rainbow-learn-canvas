import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { addAdminNote } from "@/lib/auth-store";

export const Route = createFileRoute("/upload/note")({ component: UploadNote });

function UploadNote() {
  const { t, isAdmin, user } = useApp();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto text-coral mb-3" />
        <h1 className="text-2xl font-extrabold mb-2">Sign in required</h1>
        <p className="text-muted-foreground mb-5">Please sign in to access this page.</p>
        <Link to="/login" className="btn-chunky">Go to login</Link>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto text-coral mb-3" />
        <h1 className="text-2xl font-extrabold mb-2">Admin only</h1>
        <p className="text-muted-foreground mb-5">Only administrators can upload notes for students.</p>
        <Link to="/" className="btn-chunky">Back home</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !grade || !subject) { toast.error("Please fill title, grade, and subject."); return; }
    if (!fileName && !videoUrl) { toast.error("Please attach a document or provide a video URL."); return; }
    if (videoUrl && !/^https?:\/\//i.test(videoUrl)) { toast.error("Video URL must start with http(s)://"); return; }
    const g = parseInt(grade, 10);
    addAdminNote({
      title, description, fileName, videoUrl: videoUrl || undefined,
      grade: g, subject,
      section: g <= 3 ? "lower-primary" : "upper-primary",
      author: user.name,
    });
    toast.success("Note published to students! 🎉");
    nav({ to: "/admin" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: "Admin", to: "/admin" }, { label: "Upload Note" }]} />
      <div className="grid lg:grid-cols-[1fr,320px] gap-10">
        <form onSubmit={submit} className="card-soft p-8 space-y-5">
          <div>
            <h1 className="text-3xl font-extrabold">Upload Note for Students</h1>
            <p className="text-sm text-muted-foreground mt-1">Choose a section, grade, and subject. The note will be visible to all students in that subject.</p>
          </div>

          <div>
            <Label className="font-bold mb-2 block">Title *</Label>
            <Input className="rounded-2xl h-12" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Fractions Cheat Sheet" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold mb-2 block">Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="rounded-2xl h-12"><SelectValue placeholder="Pick subject" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">🧮 Mathematics</SelectItem>
                  <SelectItem value="chinese">📖 Chinese</SelectItem>
                  <SelectItem value="english">🔤 English</SelectItem>
                  <SelectItem value="general">🌏 General Studies</SelectItem>
                  <SelectItem value="science">🔬 Science</SelectItem>
                  <SelectItem value="humanities">🏛️ Humanities</SelectItem>
                  <SelectItem value="cs">💻 CS & AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-bold mb-2 block">Grade *</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="rounded-2xl h-12"><SelectValue placeholder="Pick grade" /></SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map((g) => <SelectItem key={g} value={String(g)}>Primary {g} {g<=3 ? "(Lower)" : "(Upper)"}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/40 p-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Provide a document <span className="text-coral">or</span> a video URL (at least one)</p>
            <div>
              <Label className="font-bold mb-2 block">Document / file <span className="text-xs font-normal text-muted-foreground">(optional)</span></Label>
              <label className="rounded-2xl border-2 border-dashed border-border h-28 flex flex-col items-center justify-center text-muted-foreground hover:border-primary cursor-pointer bg-background">
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-sm">{fileName || "Click to attach a document (PDF, image, etc.)"}</span>
                <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
              </label>
              {fileName && <button type="button" onClick={() => setFileName("")} className="text-xs text-coral mt-2 underline">Remove file</button>}
            </div>
            <div>
              <Label className="font-bold mb-2 block">Video URL <span className="text-xs font-normal text-muted-foreground">(optional — YouTube, Vimeo, etc.)</span></Label>
              <Input className="rounded-2xl h-12" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            </div>
          </div>

          <div>
            <Label className="font-bold mb-2 block">Description / content</Label>
            <Textarea className="rounded-2xl min-h-[160px]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary or full text of the note..." />
          </div>

          <button type="submit" className="btn-chunky">Publish to students 🚀</button>
        </form>
        <aside className="card-soft p-6 text-center bg-gradient-to-br from-sunny/20 to-coral/20 h-fit">
          <div className="text-7xl mb-4 animate-float">🛡️</div>
          <p className="font-bold text-lg">Admin upload</p>
          <p className="text-sm text-muted-foreground mt-2">Notes you publish appear instantly in the chosen grade & subject for every student.</p>
        </aside>
      </div>
    </div>
  );
}
