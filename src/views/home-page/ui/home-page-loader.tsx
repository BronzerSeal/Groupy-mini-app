import { Skeleton } from "@/shared/ui/skeleton"

export const HomePageLoader = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="space-y-4">
        <Skeleton className="h-7 w-48 rounded-full bg-[var(--secondary)]" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full max-w-2xl rounded-2xl bg-[var(--muted)]/80" />
          <Skeleton className="h-12 w-full max-w-xl rounded-2xl bg-[var(--muted)]/65" />
        </div>
        <Skeleton className="h-5 w-full max-w-md rounded-full bg-[var(--muted)]/60" />
      </section>
    </main>
  )
}
