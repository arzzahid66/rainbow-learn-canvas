import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang, type Dict } from "./i18n";
import { SEED_ACCOUNTS, type AuthUser } from "./auth-store";

type FontSize = "sm" | "md" | "lg" | "xl";
const FONT_SCALE: Record<FontSize, number> = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  theme: "light" | "dark";
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  dyslexic: boolean;
  setDyslexic: (v: boolean) => void;
  contrast: boolean;
  setContrast: (v: boolean) => void;
  tts: boolean;
  setTts: (v: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  speak: (text: string) => void;
  user: AuthUser | null;
  isAdmin: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const Ctx = createContext<AppState | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [dyslexic, setDyslexic] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [tts, setTts] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLang(load("rl_lang", "zh" as Lang));
    setTheme(load("rl_theme", "light" as "light" | "dark"));
    setFontSize(load("rl_fontSize", "md" as FontSize));
    setDyslexic(load("rl_dyslexic", false));
    setContrast(load("rl_contrast", false));
    setTts(load("rl_tts", false));
    setReduceMotion(load("rl_motion", false));
    setUser(load<AuthUser | null>("rl_user", null));
    setHydrated(true);
  }, []);

  const login = (username: string, password: string) => {
    const acc = SEED_ACCOUNTS.find((a) => a.username === username && a.password === password);
    if (!acc) return { ok: false, error: "Invalid username or password" };
    const u: AuthUser = { username: acc.username, role: acc.role, name: acc.name };
    setUser(u);
    localStorage.setItem("rl_user", JSON.stringify(u));
    return { ok: true };
  };
  const logout = () => { setUser(null); localStorage.removeItem("rl_user"); };

  useEffect(() => { if (hydrated) localStorage.setItem("rl_lang", JSON.stringify(lang)); }, [lang, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rl_theme", JSON.stringify(theme));
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rl_fontSize", JSON.stringify(fontSize));
    document.documentElement.style.setProperty("--font-scale", String(FONT_SCALE[fontSize]));
  }, [fontSize, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rl_dyslexic", JSON.stringify(dyslexic));
    document.documentElement.classList.toggle("font-dyslexic", dyslexic);
  }, [dyslexic, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rl_contrast", JSON.stringify(contrast));
    document.documentElement.classList.toggle("contrast-high", contrast);
  }, [contrast, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("rl_tts", JSON.stringify(tts)); }, [tts, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rl_motion", JSON.stringify(reduceMotion));
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion, hydrated]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "zh" ? "zh-HK" : "en-US";
    window.speechSynthesis.speak(u);
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <Ctx.Provider value={{ lang, setLang, t: dict[lang], theme, toggleTheme, fontSize, setFontSize, dyslexic, setDyslexic, contrast, setContrast, tts, setTts, reduceMotion, setReduceMotion, speak, user, isAdmin: user?.role === "admin", login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
