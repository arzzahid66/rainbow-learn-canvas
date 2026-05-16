import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang, type Dict } from "./i18n";
import type { AuthUser } from "./auth-store";
import { supabase, type Role } from "./supabase";

type FontSize = "sm" | "md" | "lg" | "xl";
const FONT_SCALE: Record<FontSize, number> = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };

export interface AuthResult { ok: boolean; error?: string }

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
  authLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, name: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AppState | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}

async function fetchProfile(userId: string): Promise<AuthUser | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, role")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return { id: data.id, email: data.email, name: data.name, role: data.role as Role };
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
  const [authLoading, setAuthLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLang(load("rl_lang", "zh" as Lang));
    setTheme(load("rl_theme", "light" as "light" | "dark"));
    setFontSize(load("rl_fontSize", "md" as FontSize));
    setDyslexic(load("rl_dyslexic", false));
    setContrast(load("rl_contrast", false));
    setTts(load("rl_tts", false));
    setReduceMotion(load("rl_motion", false));
    setHydrated(true);
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      if (data.session?.user) {
        const p = await fetchProfile(data.session.user.id);
        if (mounted) setUser(p);
      }
      if (mounted) setAuthLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) { setUser(null); return; }
      const p = await fetchProfile(session.user.id);
      setUser(p);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  const login: AppState["login"] = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { ok: false, error: error.message };
    if (data.user) {
      const p = await fetchProfile(data.user.id);
      setUser(p);
      if (!p) return { ok: false, error: "Signed in but no profile found. Contact support." };
    }
    return { ok: true };
  };

  const signup: AppState["signup"] = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name } },
    });
    if (error) return { ok: false, error: error.message };
    // If email confirmation is OFF in Supabase, a session is returned and user is signed in.
    if (data.session?.user) {
      const p = await fetchProfile(data.session.user.id);
      setUser(p);
    }
    return { ok: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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
    <Ctx.Provider value={{ lang, setLang, t: dict[lang], theme, toggleTheme, fontSize, setFontSize, dyslexic, setDyslexic, contrast, setContrast, tts, setTts, reduceMotion, setReduceMotion, speak, user, authLoading, isAdmin: user?.role === "admin", login, signup, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
