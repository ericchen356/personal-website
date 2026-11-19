// Server Component (no 'use client') on purpose: the count is fetched at
// request/revalidation time and baked straight into the HTML, so it shows up
// instantly with zero client-side fetch delay — there's no mount/useEffect
// round-trip for it to "pop in" after, and therefore nothing to flash blank
// on reload either.
//
// `next: { revalidate }` keeps this on Next's ISR-style data cache: the
// number refreshes in the background every 60s rather than on every single
// page view. That trades exact per-visit accuracy (which would require a
// live, uncached fetch on every request) for a number that's always
// immediately present — the right trade for a vanity counter.
export async function VisitCounter() {
  // Vercel sets this per deployment; it's 'production' only on the real
  // production deployment (preview deployments get 'preview'), and is
  // unset entirely off Vercel (e.g. local dev).
  if (process.env.VERCEL_ENV !== 'production') return null

  const data = await fetch('https://abacus.jasoncameron.dev/hit/ericzxchen-com/visits', {
    next: { revalidate: 60 },
  })
    .then((res) => res.json())
    .catch(() => null)

  if (typeof data?.value !== 'number') return null

  return <p className="text-sm text-muted-foreground">site visits: {data.value.toLocaleString()}</p>
}
