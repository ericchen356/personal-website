"use client"

import { CopyButton } from "./copy-button"

const socials = [
  { label: "x", href: "https://x.com/ericzxchen" },
  { label: "linkedin", href: "https://www.linkedin.com/in/eric356/" },
  { label: "github", href: "https://github.com/ericchen356" },
]

interface SocialsRowProps {
  className?: string
}

export function SocialsRow({ className = "" }: SocialsRowProps) {
  return (
    <div className={`items-center gap-1.5 sm:gap-2 ${className}`}>
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
  )
}
