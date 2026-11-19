"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CopyButton } from "./copy-button"

const navItems = [
  { name: "home", href: "/" },
  { name: "experience", href: "/experience" },
  { name: "notes", href: "/notes" },
]

const socials = [
  { label: "x", href: "https://x.com/ericzxchen" },
  { label: "linkedin", href: "https://www.linkedin.com/in/eric356/" },
  { label: "github", href: "https://github.com/ericchen356" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-8">
        {navItems.map((item) => {
          // /notes/<slug> should keep the notes tab lit, but "/" must match exactly.
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm transition-colors group ${
                active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-px bg-foreground transition-all duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            <span className="text-foreground/25 transition-colors group-hover:text-foreground/50">
              [
            </span>
            <span className="px-1">{social.label}</span>
            <span className="text-foreground/25 transition-colors group-hover:text-foreground/50">
              ]
            </span>
          </a>
        ))}
        <CopyButton text="eric.chen4@uwaterloo.ca" label="email" />
      </div>
    </nav>
  )
}
