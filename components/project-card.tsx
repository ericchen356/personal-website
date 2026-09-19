"use client"

import Image from "next/image"
import { useRef } from "react"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  position: string
  company?: string // Optional, since pure personal projects might not have an org
  date: string
  description: string
  image: string
  video?: string // Optional; when set, autoplays in place of the static image
  videoPlaybackRate?: number // Optional; defaults to 1
  githubLink?: string // Repo link, shown as a GitHub icon
  liveLink?: string // Deployed/demo link, shown as an external-link icon
}

export function ProjectCard({
  position,
  company,
  date,
  description,
  image,
  video,
  videoPlaybackRate = 1,
  githubLink,
  liveLink
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const applyPlaybackRate = () => {
    const el = videoRef.current
    if (el) el.playbackRate = videoPlaybackRate
  }

  const CardImage = (
    <div className="relative overflow-hidden aspect-video group border bg-muted">
      {video ? (
        <video
          ref={videoRef}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={applyPlaybackRate}
          onPlay={applyPlaybackRate}
          className="absolute inset-0 h-full w-full object-cover scale-[1.25] transition-transform duration-300 group-hover:scale-[1.3]"
        />
      ) : (
        <Image
          src={image}
          alt={company ? `${position} at ${company}` : position}
          fill
          sizes="(max-w-768px) 100vw, 350px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority={false}
        />
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      {CardImage}

      {/* Card Details */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-lg leading-snug">{position}</h3>
          <div className="flex items-center gap-2 mt-1">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${position} on GitHub`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${position} live link`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {date}
            </span>
          </div>
        </div>

        {company && (
          <p className="text-sm font-medium text-foreground/80 tokens leading-none">
            {company}
          </p>
        )}
        
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {description}
        </p>
      </div>
    </div>
  )
}