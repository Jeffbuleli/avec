/** Minimal footer — e-AVEC users should not feel they are on McBuleli. */
export function McBuleliPoweredFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`mt-8 flex flex-col items-center gap-1 border-t border-transparent pb-4 pt-6 ${className}`}
    >
      <p className="text-[10px] font-medium text-[color:var(--fd-muted)]">
        © {new Date().getFullYear()} e-AVEC
      </p>
    </footer>
  );
}
