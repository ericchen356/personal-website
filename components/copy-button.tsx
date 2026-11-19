"use client"

import { Copy, Check } from "lucide-react"
import { useCopyToClipboard } from "./use-copy-to-clipboard"

interface CopyButtonProps {
  text: string
  label: string
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="group inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
    >
      <span className="text-foreground/25 transition-colors group-hover:text-foreground/50">
        [
      </span>
      <span className="inline-flex items-center gap-1 px-1">
        {label}
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </span>
      <span className="text-foreground/25 transition-colors group-hover:text-foreground/50">
        ]
      </span>
    </button>
  )
}
