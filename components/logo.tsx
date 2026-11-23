/**
 * QuantumX by WOI lockup. The source art is white on transparent, made for the
 * site's dark background.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/quantumx-logo.png"
      alt=""
      width={1055}
      height={280}
      decoding="async"
      className={`block w-auto ${className}`}
    />
  );
}
