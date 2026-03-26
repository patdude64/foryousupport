"use client"

import { useState } from "react"
import type { SiteConfig } from "@/lib/types"

interface HeaderProps {
  config: SiteConfig
}

export function Header({ config }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" }
  ]

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3">
            {config.images?.logo ? (
              <img
                src={config.images.logo}
                alt={config.companyName}
                className="h-10 md:h-12 w-auto"
              />
            ) : (
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: config.colors?.primary || "#2563eb" }}
              >
                FY
              </div>
            )}
            <span className="font-semibold text-lg hidden sm:block">{config.companyName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${config.phone}`}
              className="px-4 py-2 rounded-lg text-white transition"
              style={{ backgroundColor: config.colors?.primary || "#2563eb" }}
            >
              Call Us
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${config.phone}`}
                className="px-4 py-2 rounded-lg text-white text-center transition"
                style={{ backgroundColor: config.colors?.primary || "#2563eb" }}
              >
                Call Us: {config.phone}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
