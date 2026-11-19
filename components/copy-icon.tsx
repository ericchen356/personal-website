"use client"

import { Copy, Check } from "lucide-react"
import { useCopyToClipboard } from "./use-copy-to-clipboard"

interface CopyIconProps {
  text: string
}

export function CopyIcon({ text }: CopyIconProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="inline-flex items-center align-middle text-foreground/40 transition-colors hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}
