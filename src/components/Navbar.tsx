import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun, Languages, Settings, Menu, X, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { A11yDrawer } from "./A11yDrawer";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { lang, setLang, theme, toggleTheme, t } = useApp();
  const [a11yOpen, setA11yOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/section/lower-primary", label: t.nav.lower },
    { to: "/section/upper-primary", label: t.nav.upper },
    { to: "/discussion", label: t.nav.discussion },
    { to: "/games", label: t.nav.games },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-coral via-sunny to-sky flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="fancy-link hidden sm:inline">{t.brand}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="px-3 py-2 rounded-full text-xs font-bold hover:bg-muted flex items-center gap-1.5"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <span>{lang === "zh" ? "EN" : "中"}</span>
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted" aria-label="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setA11yOpen(true)}
              className="relative p-2 rounded-full hover:bg-muted animate-pulse-soft"
              aria-label="Accessibility settings"
            >
              <Settings className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-coral text-coral-foreground rounded-full px-1.5 py-0.5">A11y</span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 w-9 h-9 rounded-full bg-gradient-to-br from-mint to-sky flex items-center justify-center text-white" aria-label="User menu">
                  <User className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Notes</DropdownMenuItem>
                <DropdownMenuItem>My Games</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/admin">{t.admin}</Link></DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-full hover:bg-muted" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden p-6 flex flex-col gap-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <span className="fancy-link font-display font-extrabold text-xl">{t.brand}</span>
            <button onClick={() => setMobileOpen(false)} className="p-2"><X /></button>
          </div>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="text-2xl font-display font-bold py-2">{l.label}</Link>
          ))}
        </div>
      )}

      <A11yDrawer open={a11yOpen} onClose={() => setA11yOpen(false)} />
    </>
  );
}
