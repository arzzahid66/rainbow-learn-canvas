import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const { signup, user } = useApp();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="mb-4">You are already signed in as <b>{user.name}</b>.</p>
        <Link to="/" className="btn-chunky">Go home</Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const r = await signup(email.trim(), password, name.trim());
    setLoading(false);
    if (!r.ok) { setError(r.error || "Signup failed"); return; }
    toast.success("Account created! 🎉");
    nav({ to: "/" });
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="text-center mb-6">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-mint via-sky to-coral items-center justify-center text-white mb-3"><Sparkles className="w-7 h-7" /></div>
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <p className="text-sm text-muted-foreground">You’ll join as a student. Admin access is assigned separately.</p>
      </div>
      <form onSubmit={submit} className="card-soft p-6 space-y-4">
        {error && <div className="text-sm rounded-xl bg-coral/15 text-coral-foreground border border-coral/30 p-3">{error}</div>}

        <div>
          <Label className="font-bold mb-2 block">Full name</Label>
          <Input required className="rounded-2xl h-12" value={name} onChange={(e) => setName(e.target.value)} placeholder="Emily Chan" />
        </div>
        <div>
          <Label className="font-bold mb-2 block">Email</Label>
          <Input type="email" autoComplete="email" required className="rounded-2xl h-12" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <Label className="font-bold mb-2 block">Password</Label>
          <Input type="password" autoComplete="new-password" required minLength={6} className="rounded-2xl h-12" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </div>
        <button type="submit" disabled={loading} className="btn-chunky w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
