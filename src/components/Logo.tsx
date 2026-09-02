import { cn } from "@/lib/utils"

const sizes = {
  sm: { box: "size-7", icon: 14, gap: "gap-1.5", text: "text-sm" },
  default: { box: "size-8", icon: 16, gap: "gap-2", text: "text-base" },
  lg: { box: "size-11", icon: 21, gap: "gap-2.5", text: "text-xl" },
} as const

type LogoSize = keyof typeof sizes

export function LogoMark({ size = "default", className }: { size?: LogoSize; className?: string }) {
  const s = sizes[size]
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] shadow-sm shadow-primary/30",
        "bg-gradient-to-br from-primary via-primary to-[oklch(0.5_0.2_300)]",
        s.box,
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10" />
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        className="relative text-primary-foreground"
        aria-hidden="true"
      >
        <path
          d="M4.5 7 L11 12 L4.5 17"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <path
          d="M12.5 7 L19 12 L12.5 17"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function Logo({
  size = "default",
  className,
  wordmarkClassName,
}: {
  size?: LogoSize
  className?: string
  wordmarkClassName?: string
}) {
  const s = sizes[size]
  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark size={size} />
      <span className={cn("font-display font-semibold tracking-tight", s.text, wordmarkClassName)}>Nudge</span>
    </div>
  )
}
