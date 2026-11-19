'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ericzxchen-site-visits'

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)
  // Separate from `count` so the placeholder can show immediately on the
  // right host, instead of waiting on the network round-trip to the visits
  // API (which is what made the line vanish on every reload).
  const [onProdHost, setOnProdHost] = useState(false)

  useEffect(() => {
    if (window.location.hostname !== 'ericzxchen.com') return
    setOnProdHost(true)

    // React state resets on every reload — there's no persistence across
    // page loads on its own. Show last known count from localStorage
    // immediately so reloads don't flash blank while the live fetch below
    // (to a third-party API) is still in flight.
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) setCount(Number(cached))

    fetch('https://abacus.jasoncameron.dev/hit/ericzxchen-com/visits')
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value)
        localStorage.setItem(STORAGE_KEY, String(data.value))
      })
      .catch(() => {})
  }, [])

  if (!onProdHost) return null

  return (
    <p className="text-sm text-muted-foreground">
      site visits: {count === null ? '...' : count.toLocaleString()}
    </p>
  )
}
