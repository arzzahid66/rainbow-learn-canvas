import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { login, user } = useApp();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="mb-4">You are signed in as <b>{user.name}</b> ({user.role}).</p>
        <Link to="/" className="btn-chunky">Go home</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(username.trim(), password);
    if (!r.ok) { setError(r.error || "Login failed"); return; }
    toast.success("Welcome back! 🌈");
    nav({ to: "/" });
  };

  const quickFill = (u: string, p: string) => { setUsername(u); setPassword(p); setError(null); };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="text-center mb-6">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-coral via-sunny to-sky items-center justify-center text-white mb-3"><Sparkles className="w-7 h-7" /></div>
        <h1 className="text-3xl font-extrabold">Sign in</h1>
        <p className="text-sm text-muted-foreground">Use one of the demo accounts below.</p>
      </div>
      <form onSubmit={submit} className="card-soft p-6 space-y-4">
        {error && <div className="text-sm rounded-xl bg-coral/15 text-coral-foreground border border-coral/30 p-3">{error}</div>}
        <div>
          <Label className="font-bold mb-2 block">Username</Label>
          <Input className="rounded-2xl h-12" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin or student" />
        </div>
        <div>
          <Label className="font-bold mb-2 block">Password</Label>
          <Input type="password" className="rounded-2xl h-12" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
        </div>
        <button type="submit" className="btn-chunky w-full inline-flex items-center justify-center gap-2"><LogIn className="w-4 h-4" /> Sign in</button>
      </form>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <button onClick={() => quickFill("admin", "admin123")} className="card-soft p-4 text-left hover:ring-2 hover:ring-primary transition">
          <div className="text-xs uppercase font-bold text-coral">Admin</div>
          <div className="font-bold mt-1">admin / admin123</div>
          <div className="text-xs text-muted-foreground mt-1">Full access — upload notes, approvals.</div>
        </button>
        <button onClick={() => quickFill("student", "student123")} className="card-soft p-4 text-left hover:ring-2 hover:ring-primary transition">
          <div className="text-xs uppercase font-bold text-sky">Student</div>
          <div className="font-bold mt-1">student / student123</div>
          <div className="text-xs text-muted-foreground mt-1">Browse notes, videos, games.</div>
        </button>
      </div>
    </div>
  );
}
