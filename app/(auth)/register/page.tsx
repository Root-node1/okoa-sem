import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full p-6 rounded-lg bg-surface-1 border border-border-subtle shadow-none space-y-5">
      <div className="text-center space-y-1">
        <div className="inline-flex w-10 h-10 rounded-lg bg-surface-2 border border-border-strong items-center justify-center font-serif-display font-semibold text-lg text-txt-main mb-2">
          N
        </div>
        <h1 className="font-serif-display text-xl font-semibold text-txt-main">
          Create an Account
        </h1>
        <p className="text-xs text-txt-muted">
          Enroll as a student or register as a departmental faculty lecturer
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Phinehas Murage"
            className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1">
            Student Reg No. / Staff ID
          </label>
          <input
            type="text"
            placeholder="e.g. SCT211-0042/2026"
            className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main font-mono-code"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main"
          />
        </div>

        <button
          type="button"
          className="w-full h-9 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 transition-opacity"
        >
          Create Account
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
