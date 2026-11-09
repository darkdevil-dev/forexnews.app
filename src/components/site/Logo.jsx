export function Logo({ className = "h-7 w-7" }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/logo-black.png"
        alt="Forex News"
        className="h-full w-full object-contain dark:hidden"
      />
      <img
        src="/logo-white.png"
        alt="Forex News"
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  );
}

