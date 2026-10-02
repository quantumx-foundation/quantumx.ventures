type IconProps = { className?: string };

export function ArrowRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M3 10h13.5M11.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M10 2.5v14.5M5.5 12.5 10 17l4.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M10 2.5v15M2.5 10h15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
