"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { WorkListItem } from "@/components/work-list-item"
import { motion, Variants } from "framer-motion"
import type { RowArt } from "@/lib/row-art"
import { ExperienceTabs, type Tab, type TabId } from "@/components/experience-tabs"

type FilterType = TabId

type Experience = {
  id: string
  position: string
  company?: string
  date: string
  description?: string
  image?: string
  video?: string
  videoPlaybackRate?: number
  icon?: string
  link?: string
  githubLink?: string
  liveLink?: string
  category: FilterType
  /** Hover art for work rows: brand hue plus a variant of the shared motif. */
  art?: RowArt
}

const experiences: Experience[] = [
  {
    id: "watai",
    position: "Research Engineer",
    company: "WAT.ai",
    date: "2026",
    image: "",
    icon: "/images/watai.png",
    link: "https://watai.ca/",
    category: "work",
    art: { hue: 47, variant: 3 },
  },
  {
    id: "lunon-swe",
    position: "Software Engineer",
    company: "Lunon",
    date: "2026",
    image: "",
    icon: "/images/lunon.png",
    link: "https://lunon.ai/",
    category: "work",
    art: { hue: 202, variant: 1 },
  },
  {
    id: "magic-hour-swe",
    position: "Software Engineer",
    company: "Magic Hour (YC W24)",
    date: "2026",
    image: "",
    icon: "https://magichour.ai/favicon.ico",
    link: "https://magichour.ai/",
    category: "work",
    art: { hue: 276, variant: 2 },
  },
  {
    id: "droneresearch",
    position: "Research Engineer",
    company: "University of Toronto",
    date: "2026",
    image: "",
    icon: "https://www.utoronto.ca/favicon.ico",
    link: "https://flight.utias.utoronto.ca/",
    category: "work",
    art: { hue: 224, variant: 0 },
  },
  {
    id: "tmas-swe",
    position: "Software Engineer",
    company: "TMAS Academy",
    date: "2025",
    image: "/images/TMASwebsite.webp",
    icon: "/images/tmas.jpg",
    link: "https://www.youtube.com/channel/UC-Nt9Uo03VSo2QTNIzsE_cA/videos",
    category: "work",
    art: { hue: 25, variant: 3 },
  },
  {
    id: "zurich",
    position: "Claims Analyst",
    company: "Zurich Insurance",
    date: "2024",
    image: "/images/zurich.webp",
    icon: "https://www.zurichcanada.com/favicon.ico",
    link: "https://www.zurich.com/",
    category: "work",
    art: { hue: 208, variant: 2 },
  },

  {
    id: "mayim",
    position: "Mayim",
    date: "2026",
    description: "Finds the highest-leverage site for new clean-water infrastructure in underserved towns, then designs and costs it. Won 3rd at the General Catalyst Hackathon.",
    image: "/images/mayim.webp",
    video: "/videos/mayim.mp4",
    githubLink: "https://github.com/michaelmazilu/mayim",
    liveLink: "https://mayimgc.vercel.app/",
    category: "projects",
  },
  {
    id: "polybot",
    position: "PolyBot",
    date: "2026",
    description: "Runs prediction markets on autonomous browser agents racing to complete tasks while a master agent tries to sabotage them. Won 1st place at UTMIST x WATAI Hackathon.",
    image: "/images/polybot.webp",
    video: "/videos/polybot.mp4",
    githubLink: "https://github.com/tkachyn/polybot",
    liveLink: "https://polybot-inky.vercel.app",
    category: "projects",
  },
  {
    id: "skechmotion",
    position: "SketchMotion",
    date: "2026",
    description: "A multi-clip storyboard tool that turns hand-drawn keyframes into animation, guided by an agentic crew that interviews you about your vision. Won Best Use of Gemini API at CentennialHacks.",
    image: "/images/skechmotion.webp",
    video: "/videos/skechmotion.mp4",
    githubLink: "https://github.com/ericchen356/skechmotion",
    category: "projects",
  },
  {
    id: "atlas",
    position: "Atlas",
    date: "2026",
    description: "Capture memories by re-living moments as walkable photorealistic 3D Gaussian Splats, complete with the ambient audio recorded during the shoot.",
    image: "/images/atlas.webp",
    video: "/videos/atlas.mp4",
    videoPlaybackRate: 1.25,
    githubLink: "https://github.com/nicholaskim17/atlas",
    category: "projects",
  },
  {
    id: "splavinci",
    position: "Splavinci",
    date: "2026",
    description: "Generates cinematic camera flythroughs from a Gaussian-splat capture of a room, planning a wall-aware path between the waypoints you place.",
    image: "/images/splavinci.webp",
    video: "/videos/splavinci.mp4",
    videoPlaybackRate: 1.25,
    githubLink: "https://github.com/ericchen356/splavinci",
    category: "projects",
  },
  {
    id: "memory-bench",
    position: "Memory Bench",
    date: "2026",
    description: "A benchmark measuring how different AI agent memory architectures (full history, search, summarization, fact stores) degrade as conversation history grows.",
    image: "/images/memory-bench.webp",
    video: "/videos/memory-bench.mp4",
    githubLink: "https://github.com/ericchen356/memory-bench",
    category: "projects",
  },
  {
    id: "nomad",
    position: "Nomad",
    date: "2026",
    description: "Issues passports for AI agents to prevent fraudulent activity. Won Best Use of Solana @ JamHacks10, Canada's biggest high school hackathon.",
    image: "/images/nomad.webp",
    video: "/videos/nomad.mp4",
    videoPlaybackRate: 1.25,
    githubLink: "https://github.com/michaelmazilu/nomad",
    liveLink: "https://x.com/ericzxchen/status/2066627155706933311",
    category: "projects",
  },
  {
    id: "ecrivons",
    position: "Écrivons",
    date: "2026",
    description: "A social app that builds connections through shared reflection and memories. Won best high school team @ Western Founders Network's Designathon.",
    image: "/images/ecrivons.webp",
    liveLink: "https://devpost.com/software/ecrivon",
    category: "projects",
  },
  {
    id: "sph",
    position: "Smoothed Particle Hydrodynamics Simulation",
    date: "2025",
    description: "Simulated fluid particle behavior using Smoothed Particle Hydrodynamics, built alongside PhD candidates at the University of Toronto.",
    image: "/images/SPH.webp",
    githubLink: "https://github.com/EricChen356/SPH-Simulation",
    category: "projects",
  },
  {
    id: "sac-website",
    position: "Student Council Website",
    date: "2025",
    description: "Designed and built my school's first official website from scratch, now used by 2,000+ students.",
    image: "/images/SACwebsite.webp",
    githubLink: "https://github.com/MillikenSAC/SACWebsite",
    category: "projects",
  },
  {
    id: "atd",
    position: "Anthropomorphic Testing Device",
    date: "2025",
    description: "A low-cost ATD used to simulate the biomechanics of a 7- to 11-year-old in slow-speed car crashes.",
    image: "/images/Engineering.webp",
    category: "projects",
  },
  {
    id: "safeguard",
    position: "SafeGuard",
    date: "2024",
    description: "Chrome extension that tests the reliability of a site. Won 1st place at YRHacks 2024.",
    image: "/images/SafeGuard.webp",
    category: "projects",
  },
  {
    id: "hackcanada",
    position: "Organizer",
    company: "Hack Canada",
    date: "2026",
    description: "Organizing logistics for one of Canada's biggest hackathons.",
    image: "/images/hackcanada.webp",
    link: "https://hackcanada.org/",
    category: "community",
  },
  {
    id: "yrpc",
    position: "Prime Minister",
    company: "York Region Presidents' Council",
    date: "High School",
    description: "Led the official student senate of the York Region District School Board, representing 135k+ students.",
    image: "/images/SOM.webp",
    link: "https://www2.yrdsb.ca/about-us/board-trustees/student-trustees/york-region-presidents-council-yrpc",
    category: "community",
  },
  {
    id: "launchup",
    position: "Co-Founder",
    company: "LaunchUp!",
    date: "High School",
    description: "Hosted community events to inspire youth entrepreneurship, engaging 110k+ students worldwide.",
    image: "/images/Launchup.webp",
    link: "https://www.instagram.com/launchup.project/",
    category: "community",
  },
  {
    id: "deca",
    position: "Entrepreneurship Trainer",
    company: "Milliken DECA Chapter",
    date: "High School",
    description: "Trained 15+ students in entrepreneurship, winning regionals, provincials, and qualifying for internationals.",
    image: "/images/deca.jpg",
    link: "https://www.deca.org/",
    category: "community",
  },
  {
    id: "sac",
    position: "Technology Chair",
    company: "Student Activity Council",
    date: "High School",
    description: "Built my school's first website (2k+ users) and organized events to improve the school community.",
    image: "/images/sacphoto.webp",
    link: "https://www.instagram.com/milliken_sac/",
    category: "community",
  },
  {
    id: "frc",
    position: "Executive",
    company: "Team 9569 FIRST Robotics",
    date: "High School",
    description: "Led community outreach and sponsorships, manufactured and assembled robots, and won awards.",
    image: "/images/robotics.webp",
    link: "https://frc.silverknights.ca/",
    category: "community",
  },
]

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
]

// Sortable rank for a date string like "2026", "June 2026" or "High School".
// Higher is more recent; dates with no year (e.g. "High School") sort last.
function dateRank(date: string): number {
  const year = date.match(/\d{4}/)
  if (!year) return -1

  const month = MONTHS.findIndex((m) => date.toLowerCase().includes(m))
  return Number(year[0]) * 12 + (month === -1 ? 0 : month)
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 100, 
      damping: 15 
    } 
  },
}

export function ExperienceSection() {
  const [filter, setFilter] = useState<FilterType>("work")

  // Newest first. Sort is stable, so same-date entries keep their data order.
  const filteredExperiences = experiences
    .filter((exp) => exp.category === filter)
    .sort((a, b) => dateRank(b.date) - dateRank(a.date))

  // Group work entries under a single heading per year.
  const workByYear = filteredExperiences.reduce<
    { year: string; items: typeof filteredExperiences }[]
  >((groups, exp) => {
    const last = groups[groups.length - 1]
    if (last && last.year === exp.date) {
      last.items.push(exp)
    } else {
      groups.push({ year: exp.date, items: [exp] })
    }
    return groups
  }, [])

  const tabs: Tab[] = [
    { id: "work", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "community", label: "community" },
  ]

  return (
    <div className="mt-5">
      <ExperienceTabs tabs={tabs} active={filter} onSelect={setFilter} />

      {filter === "work" ? (
        /* Work: year headings with entries listed beneath */
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2"
        >
          {workByYear.map((group) => (
            <motion.div key={group.year} variants={itemVariants} className="flex gap-4">
              <span className="w-12 shrink-0 pt-2.5 text-xs tabular-nums text-foreground/40">
                {group.year}
              </span>

              <div className="flex min-w-0 flex-1 flex-col">
                {group.items.map((exp) => (
                  <WorkListItem
                    key={exp.id}
                    position={exp.position}
                    company={exp.company}
                    icon={exp.icon}
                    link={exp.link}
                    art={exp.art}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Projects & Community: two-column card grid */
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredExperiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants}>
              <ProjectCard
                position={exp.position}
                company={exp.company}
                date={exp.date}
                description={exp.description ?? ""}
                image={exp.image ?? ""}
                video={exp.video}
                videoPlaybackRate={exp.videoPlaybackRate}
                githubLink={exp.githubLink}
                liveLink={exp.liveLink}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}