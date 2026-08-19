import Link from "next/link";
import { MCBULELI_POWERED_LOGO } from "@/lib/brand-logo";

const X_URL = "https://x.com/McBuleli";

export function McBuleliPoweredFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`mt-8 flex flex-col items-center gap-1.5 border-t border-transparent pb-4 pt-6 ${className}`}
    >
      <div className="flex items-center gap-2 text-[10px] text-[color:var(--fd-muted)]">
        <span>Powered by</span>
        <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MCBULELI_POWERED_LOGO}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </span>
        <Link
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-[color:var(--fd-primary)] hover:underline"
        >
          McBuleli
        </Link>
      </div>
    </footer>
  );
}
