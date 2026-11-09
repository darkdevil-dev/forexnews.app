import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-4 max-w-[28ch] text-[clamp(1.8rem,3.6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground",
          isCenter && "mx-auto text-center"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-lg text-[14.5px] leading-relaxed text-muted-foreground",
            isCenter && "mx-auto text-center"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
