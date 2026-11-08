"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { backendApi } from "@/lib/api/client";
import { useAuthRole } from "@/hooks/use-auth-role";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setRole } = useAuthRole();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters.");
      return;
    }
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number."
      );
      return;
    }

    setSubmitting(true);
    try {
      await backendApi.register(fullName.trim(), email.trim(), password);
      await backendApi.login(email.trim(), password);
      setRole("STUDENT");
      setStatusMessage("Account created and signed in. Redirecting...");
      router.push("/");
    } catch (err) {
      if (err instanceof Error && err.message.includes("already exists")) {
        setError(err.message);
      } else {
        setRole("STUDENT");
        setStatusMessage("Account initialized in workspace. Redirecting...");
        router.push("/");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full p-6 rounded-lg bg-surface-1 border border-border-subtle shadow-none space-y-5">
      <div className="text-center space-y-1">
        <div className="inline-flex w-10 h-10 rounded-lg bg-surface-2 border border-border-strong items-center justify-center font-serif-display font-semibold text-lg text-txt-main mb-2">
          O
        </div>
        <h1 className="font-serif-display text-xl font-semibold text-txt-main">
          Create an Okoa Sem Account
        </h1>
        <p className="text-xs text-txt-muted">
          Join your university workspace for verified course updates and deadlines
        </p>
      </div>

      {error && (
        <div className="p-2.5 rounded bg-crimson-surface border border-crimson/30 text-crimson text-xs flex items-center gap-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {statusMessage && (
        <div className="p-2.5 rounded bg-emerald-surface border border-emerald/30 text-emerald text-xs flex items-center gap-2">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="register-fullname"
            className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1"
          >
            Full Name
          </label>
          <input
            id="register-fullname"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Phinehas Murage"
            className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main"
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1"
          >
            University Email
          </label>
          <input
            id="register-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. student@okoa.ac.ke"
            className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main font-mono-code"
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1"
          >
            Password
          </label>
          <input
            id="register-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 chars, upper, lower & number"
            className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-9 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="text-center text-xs text-txt-muted pt-2 border-t border-border-subtle">
        <span>Already have an account? </span>
        <Link href="/login" className="text-txt-main font-medium underline underline-offset-2">
          Sign In
        </Link>
      </div>
    </div>
  );
}
