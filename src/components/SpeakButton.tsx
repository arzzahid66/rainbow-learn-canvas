import { Volume2 } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function SpeakButton({ text, className = "" }: { text: string; className?: string }) {
  const { tts, speak } = useApp();
  if (!tts) return null;
  return (
    <button
      onClick={() => speak(text)}
      aria-label="Read aloud"
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-sunny/40 hover:bg-sunny text-sunny-foreground transition ${className}`}
    >
      <Volume2 className="w-3.5 h-3.5" />
    </button>
  );
}

export function Speakable({ as: As = "p", children, className = "" }: { as?: any; children: string; className?: string }) {
  return (
    <As className={`group inline-flex items-start gap-2 ${className}`}>
      <span>{children}</span>
      <SpeakButton text={children} className="opacity-70 group-hover:opacity-100 mt-1" />
    </As>
  );
}
