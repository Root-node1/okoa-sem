export default function UnitEmptyIndexPage() {
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center p-8 text-center select-none bg-canvas">
      <div className="w-12 h-12 rounded-lg bg-surface-2 border border-border-strong flex items-center justify-center font-mono-code text-sm font-semibold text-txt-muted mb-3">
        Ø
      </div>
      <h3 className="font-serif-display text-lg text-txt-main">
        No Thread Selected
      </h3>
      <p className="text-xs text-txt-muted max-w-xs mt-1 leading-relaxed">
        Choose a submission, lab code review, or doubt from the queue on the
        left to inspect solutions and annotate.
      </p>
    </div>
  );
}
