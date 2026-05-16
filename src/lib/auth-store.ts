// Admin-uploaded notes store (localStorage). Auth now lives in Supabase — see lib/supabase.ts.

export type Role = "admin" | "user";
export interface AuthUser { id: string; email: string; role: Role; name: string }

export interface AdminNote {
  id: string;
  title: string;
  description: string;
  section: "lower-primary" | "upper-primary";
  grade: number; // 1..6
  subject: string; // subject key, e.g. math
  fileName?: string;
  videoUrl?: string;
  createdAt: number;
  author: string;
}

const NOTES_KEY = "rl_admin_notes";

export function loadAdminNotes(): AdminNote[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); } catch { return []; }
}
export function saveAdminNotes(notes: AdminNote[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  window.dispatchEvent(new Event("rl_admin_notes_changed"));
}
export function addAdminNote(n: Omit<AdminNote, "id" | "createdAt">) {
  const notes = loadAdminNotes();
  const note: AdminNote = { ...n, id: crypto.randomUUID(), createdAt: Date.now() };
  notes.unshift(note);
  saveAdminNotes(notes);
  return note;
}
export function deleteAdminNote(id: string) {
  saveAdminNotes(loadAdminNotes().filter((n) => n.id !== id));
}
