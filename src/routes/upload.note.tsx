import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/upload/note")({ component: UploadNote });

function UploadNote() {
  const { t } = useApp();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs items={[{ label: t.upload.btn }]} />
      <div className="grid lg:grid-cols-[1fr,320px] gap-10">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success(t.upload.success); }}
          className="card-soft p-8 space-y-5"
        >
          <h1 className="text-3xl font-extrabold">{t.upload.btn.replace("+ ", "")}</h1>
          <p className="text-sm text-muted-foreground">{t.upload.review}</p>

          <div>
            <Label className="font-bold mb-2 block">Title</Label>
            <Input className="rounded-2xl h-12" placeholder="My amazing note title" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold mb-2 block">Subject</Label>
              <Select><SelectTrigger className="rounded-2xl h-12"><SelectValue placeholder="Pick subject" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">🧮 Mathematics</SelectItem>
                  <SelectItem value="chinese">📖 中國語文</SelectItem>
                  <SelectItem value="english">🔤 English</SelectItem>
                  <SelectItem value="science">🔬 Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-bold mb-2 block">Grade</Label>
              <Select><SelectTrigger className="rounded-2xl h-12"><SelectValue placeholder="Pick grade" /></SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map((g) => <SelectItem key={g} value={`p${g}`}>Primary {g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="font-bold mb-2 block">Cover image</Label>
            <div className="rounded-2xl border-2 border-dashed border-border h-32 flex flex-col items-center justify-center text-muted-foreground hover:border-primary cursor-pointer">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-sm">Click or drop a file</span>
            </div>
          </div>
          <div>
            <Label className="font-bold mb-2 block">Content</Label>
            <Textarea className="rounded-2xl min-h-[200px]" placeholder="Write your note here..." />
          </div>
          <div>
            <Label className="font-bold mb-2 block">Tags</Label>
            <Input className="rounded-2xl h-12" placeholder="fractions, easy, p3" />
          </div>
          <button type="submit" className="btn-chunky">Submit for review 🚀</button>
        </form>
        <aside className="card-soft p-6 text-center bg-gradient-to-br from-sunny/20 to-coral/20 h-fit">
          <div className="text-7xl mb-4 animate-float">🌟</div>
          <p className="font-bold text-lg">Your note will help others learn!</p>
          <p className="text-sm text-muted-foreground mt-2">Submissions are reviewed by an admin within 24 hours to keep our hub safe and helpful.</p>
        </aside>
      </div>
    </div>
  );
}
