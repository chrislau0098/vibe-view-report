interface OwlSilhouetteProps {
  size?: number;
  className?: string;
}

export function OwlSilhouette({ size = 60, className }: OwlSilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="猫头鹰"
    >
      {/* Body */}
      <path d="M20 44 C18 52 22 58 30 58 C38 58 42 52 40 44 L38 28 C38 22 34 18 30 18 C26 18 22 22 22 28 Z" />
      {/* Head */}
      <path d="M22 22 C20 14 24 8 30 8 C36 8 40 14 38 22" />
      {/* Left ear tuft */}
      <path d="M23 10 L20 4 L25 9" />
      {/* Right ear tuft */}
      <path d="M37 10 L40 4 L35 9" />
      {/* Left eye circle */}
      <circle cx="25" cy="22" r="4.5" />
      <circle cx="25" cy="22" r="2" fill="currentColor" stroke="none" />
      {/* Right eye circle */}
      <circle cx="35" cy="22" r="4.5" />
      <circle cx="35" cy="22" r="2" fill="currentColor" stroke="none" />
      {/* Beak */}
      <path d="M27.5 27 L30 30 L32.5 27 Z" fill="currentColor" stroke="none" />
      {/* Wing left */}
      <path d="M22 30 C16 32 14 40 18 44" />
      {/* Wing right */}
      <path d="M38 30 C44 32 46 40 42 44" />
      {/* Feet */}
      <path d="M26 56 L23 60 M26 56 L26 60 M26 56 L29 60" />
      <path d="M34 56 L31 60 M34 56 L34 60 M34 56 L37 60" />
    </svg>
  );
}
