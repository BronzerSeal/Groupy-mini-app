export function intensityClass(amount: number, max: number): string {
  if (amount === 0) return "fill-muted/20 stroke-border stroke-[0.3]"
  const ratio = amount / max
  if (ratio < 0.2) return "fill-primary/10"
  if (ratio < 0.4) return "fill-primary/25"
  if (ratio < 0.65) return "fill-primary/45"
  return "fill-primary/70"
}
