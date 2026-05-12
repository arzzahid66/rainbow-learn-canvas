import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { useApp } from "@/lib/app-context";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useApp();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border mt-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-display font-extrabold text-lg fancy-link">{t.brand}</div>
            <p className="text-muted-foreground mt-2">© 2025 Rainbow Learn Hub</p>
          </div>
          <div className="flex flex-col gap-2 font-semibold">
            <a className="hover:text-primary">{t.footer.about}</a>
            <a className="hover:text-primary">{t.footer.contact}</a>
            <a className="hover:text-primary">{t.footer.privacy}</a>
          </div>
          <div className="flex gap-3 text-2xl">🌈 📚 🎮 🔬</div>
        </div>
      </footer>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const { t } = useApp();
  const all = [{ label: t.breadcrumb.home, to: "/" }, ...items];
  return (
    <nav className="flex items-center gap-1 text-sm font-semibold text-muted-foreground mb-6 flex-wrap">
      {all.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {it.to && i < all.length - 1 ? (
            <Link to={it.to} className="hover:text-primary">{it.label}</Link>
          ) : (
            <span className="text-foreground">{it.label}</span>
          )}
          {i < all.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
        </span>
      ))}
    </nav>
  );
}
