/**
 * QuantumX mark, traced as vector from the brand logo (logo.png) so it renders
 * crisply at any size and inherits the current text colour.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="117 203 790 618"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M117 203H310L500 393V203H714V606L522 416H117Z" />
      <path d="M310 416L502 606H907V821H714L524 628V821H310Z" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-[18px] w-auto shrink-0" />
      <span className="whitespace-nowrap text-[1.0625rem] font-normal leading-none tracking-[-0.01em]">
        QuantumX <span className="text-muted">Ventures</span>
      </span>
    </span>
  );
}
