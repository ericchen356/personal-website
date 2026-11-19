"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "./navbar"

export function Header() {
  const [showChinese, setShowChinese] = useState(false)

  return (
    <header className="w-full">
      {/* Navbar */}
      <div className="py-6 border-b border-border/40">
        <Navbar />
      </div>

      {/* Name */}
      <div className="pt-4">
        <Link href="/">
          {/*
            The English name always holds the box's width; the Chinese name is
            overlaid on top. Swapping the text outright made the heading narrower
            mid-hover, so the cursor fell outside it and the two names flickered.
          */}
          <h1
            className="relative inline-block text-3xl md:text-4xl font-bold cursor-pointer"
            onMouseEnter={() => setShowChinese(true)}
            onMouseLeave={() => setShowChinese(false)}
          >
            <span
              className={`transition-opacity duration-300 ${
                showChinese ? "opacity-0" : "opacity-100"
              }`}
            >
              Eric Chen
            </span>

            <span
              aria-hidden
              className={`absolute inset-0 transition-opacity duration-300 ${
                showChinese ? "opacity-100" : "opacity-0"
              }`}
            >
              陈振轩
            </span>
          </h1>
        </Link>
      </div>
    </header>
  )
}
