import { cn } from "@/lib/utils";
import { PLAY_STORE_URL } from "@/lib/site";

function PlayGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8.4 3.6v16.8c0 .95 1.03 1.55 1.86 1.08l13.1-8.4a1.28 1.28 0 0 0 0-2.16L10.26 2.52c-.83-.47-1.86.13-1.86 1.08Z" />
    </svg>
  );
}

const sizes = {
  sm: "h-9 px-3.5 text-[12.5px] gap-2",
  md: "h-11 px-5 text-[13.5px] gap-2",
  lg: "h-12 px-6 text-[14.5px] gap-2.5",
};

const variants = {
  signal: "bg-signal text-black hover:brightness-95",
  contrast: "bg-foreground text-background hover:opacity-85",
  outline:
    "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
};

export function DownloadButton({
  size = "md",
  variant = "signal",
  className,
  children = "Download for Android",
  href = PLAY_STORE_URL,
  showGlyph = true,
  ...rest
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex select-none items-center justify-center rounded-[9px] font-semibold tracking-[-0.01em] transition-all duration-200",
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      {showGlyph && <PlayGlyph className="h-[0.76em] w-[0.76em] translate-y-[0.5px]" />}
      <span>{children}</span>
    </a>
  );
}