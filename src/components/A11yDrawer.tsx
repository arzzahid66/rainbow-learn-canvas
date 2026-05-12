import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-context";
import { Type, Eye, Volume2, Wind } from "lucide-react";

export function A11yDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, fontSize, setFontSize, dyslexic, setDyslexic, contrast, setContrast, tts, setTts, reduceMotion, setReduceMotion } = useApp();
  const sizes = [
    { v: "sm", label: t.a11y.small },
    { v: "md", label: t.a11y.normal },
    { v: "lg", label: t.a11y.large },
    { v: "xl", label: t.a11y.xl },
  ] as const;
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-[340px] sm:w-[400px] p-6 flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-2xl flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-coral/20 flex items-center justify-center">♿</span>
            {t.a11y.title}
          </SheetTitle>
        </SheetHeader>

        <div>
          <Label className="flex items-center gap-2 font-bold mb-3"><Type className="w-4 h-4" />{t.a11y.fontSize}</Label>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((s) => (
              <button
                key={s.v}
                onClick={() => setFontSize(s.v)}
                className={`py-2 rounded-xl text-sm font-bold transition ${fontSize === s.v ? "bg-primary text-primary-foreground shadow-md" : "bg-muted hover:bg-muted/70"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <Row icon={<Type className="w-4 h-4" />} label={t.a11y.dyslexic} checked={dyslexic} onChange={setDyslexic} />
        <Row icon={<Eye className="w-4 h-4" />} label={t.a11y.contrast} checked={contrast} onChange={setContrast} />
        <Row icon={<Volume2 className="w-4 h-4" />} label={t.a11y.tts} checked={tts} onChange={setTts} />
        <Row icon={<Wind className="w-4 h-4" />} label={t.a11y.motion} checked={reduceMotion} onChange={setReduceMotion} />

        <p className="text-xs text-muted-foreground mt-auto">All settings are saved on your device.</p>
      </SheetContent>
    </Sheet>
  );
}

function Row({ icon, label, checked, onChange }: { icon: React.ReactNode; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
      <Label className="flex items-center gap-2 font-semibold">{icon}{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
