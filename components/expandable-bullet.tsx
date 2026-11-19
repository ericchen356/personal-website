"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface ExpandableBulletProps {
  label: string
  children: React.ReactNode
}

export function ExpandableBullet({ label, children }: ExpandableBulletProps) {
  const [open, setOpen] = useState(false)

  return (
    <li className="my-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex items-baseline gap-2 text-left"
      >
        <span className="text-foreground/40">•</span>
        <span className="inline-flex items-center gap-1 text-foreground/80">
          {label}
          <ChevronRight
            className={`h-3.5 w-3.5 text-foreground/40 transition-transform duration-200 group-hover:text-foreground/60 ${
              open ? "rotate-90" : ""
            }`}
          />
        </span>
      </button>

      {open && <ul className="pl-5 mt-1">{children}</ul>}
    </li>
  )
}
