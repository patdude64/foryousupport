"use client"

import { useState, useEffect } from "react"
import { Header } from "./sections/Header"
import { Hero } from "./sections/Hero"
import { Services } from "./sections/Services"
import { About } from "./sections/About"
import { Team } from "./sections/Team"
import { Contact } from "./sections/Contact"
import { Footer } from "./sections/Footer"
import type { SiteConfig } from "@/lib/types"

const defaultConfig: SiteConfig = {
  companyName: "For You Support Coordination",
  tagline: "Empowering Your NDIS Journey with Personalized Support",
  phone: "0412 345 678",
  email: "info@foryousupport.com.au",
  address: "123 Support Street, Melbourne VIC 3000",
  abn: "12 345 678 901",
  ndisNumber: "4050012345",
  socialMedia: {
    facebook: "https://facebook.com/foryousupport",
    instagram: "https://instagram.com/foryousupport",
    linkedin: "https://linkedin.com/company/foryousupport"
  },
  images: {
    logo: "",
    heroBanner: "",
    aboutImage: "",
    teamPhotos: [],
    serviceImages: {},
    galleryImages: []
  },
  colors: {
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#f59e0b"
  },
  hero: {
    title: "Your Trusted NDIS Support Coordination Partner",
    subtitle: "We help you navigate the NDIS with confidence and care",
    ctaText: "Get Started Today",
    ctaLink: "#contact"
  },
  services: [
    {
      id: "1",
      title: "Support Coordination",
      description: "We help you understand and implement your NDIS plan effectively, connecting you with the right providers and services.",
      icon: "clipboard"
    },
    {
      id: "2",
      title: "Plan Management",
      description: "Let us handle the financial aspects of your NDIS plan, including payments, budgets, and reporting.",
      icon: "calculator"
    },
    {
      id: "3",
      title: "Specialist Support",
      description: "Access specialized support for complex needs, with experienced coordinators who understand your unique situation.",
      icon: "heart"
    }
  ],
  about: {
    title: "About For You Support",
    description: "We are a dedicated team of NDIS support coordinators committed to helping you achieve your goals. With years of experience in the disability sector, we understand the unique challenges you face and are here to support you every step of the way.",
    mission: "To empower individuals with disabilities to live their best lives through personalized, compassionate support coordination.",
    values: ["Respect", "Integrity", "Empowerment", "Excellence"]
  },
  team: [],
  testimonials: [],
  contact: {
    formEnabled: true,
    mapEnabled: false,
    mapEmbedUrl: ""
  }
}

export function SiteContent() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/config")
      .then(res => res.json())
      .then(data => {
        setConfig({ ...defaultConfig, ...data })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (config.colors?.primary) {
      document.documentElement.style.setProperty("--color-primary-custom", config.colors.primary)
      document.documentElement.style.setProperty("--color-secondary-custom", config.colors.secondary || "#7c3aed")
      document.documentElement.style.setProperty("--color-accent-custom", config.colors.accent || "#f59e0b")
    }
  }, [config.colors])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header config={config} />
      <main>
        <Hero config={config} />
        <Services config={config} />
        <About config={config} />
        {config.team && config.team.length > 0 && <Team config={config} />}
        <Contact config={config} />
      </main>
      <Footer config={config} />
    </div>
  )
}
