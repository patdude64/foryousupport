"use client"

import { useState, useEffect } from "react"
import { ImageUpload } from "@/components/admin/ImageUpload"
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
    logo: "/images/logo.jpg",
    heroBanner: "/images/header-banner.jpg",
    aboutImage: "",
    teamPhotos: [],
    serviceImages: {},
    galleryImages: []
  },
  colors: {
    primary: "#1a7b7b",
    secondary: "#2d5a5a",
    accent: "#e8a340"
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
      icon: "clipboard",
      image: ""
    },
    {
      id: "2", 
      title: "Plan Management",
      description: "Let us handle the financial aspects of your NDIS plan, including payments, budgets, and reporting.",
      icon: "calculator",
      image: ""
    },
    {
      id: "3",
      title: "Specialist Support",
      description: "Access specialized support for complex needs, with experienced coordinators who understand your unique situation.",
      icon: "heart",
      image: ""
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
    mapEnabled: true,
    mapEmbedUrl: ""
  }
}

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [activeTab, setActiveTab] = useState("general")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config")
      if (res.ok) {
        const data = await res.json()
        setConfig({ ...defaultConfig, ...data })
      }
    } catch (error) {
      console.error("Failed to fetch config:", error)
    }
  }

  const saveConfig = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      })
      if (res.ok) {
        setMessage("Configuration saved successfully!")
      } else {
        setMessage("Failed to save configuration")
      }
    } catch (error) {
      setMessage("Error saving configuration")
    }
    setSaving(false)
    setTimeout(() => setMessage(""), 3000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setAuthenticated(true)
    } else {
      setMessage("Invalid password")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const updateConfig = (path: string, value: unknown) => {
    setConfig(prev => {
      const newConfig = { ...prev }
      const keys = path.split(".")
      let current: Record<string, unknown> = newConfig
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>
      }
      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      icon: "star",
      image: ""
    }
    setConfig(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }))
  }

  const updateService = (index: number, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map((s, i) => 
        i === index ? { ...s, [field]: value } : s
      )
    }))
  }

  const removeService = (index: number) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }

  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: "New Team Member",
      role: "Support Coordinator",
      bio: "",
      image: ""
    }
    setConfig(prev => ({
      ...prev,
      team: [...(prev.team || []), newMember]
    }))
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      team: (prev.team || []).map((t, i) =>
        i === index ? { ...t, [field]: value } : t
      )
    }))
  }

  const removeTeamMember = (index: number) => {
    setConfig(prev => ({
      ...prev,
      team: (prev.team || []).filter((_, i) => i !== index)
    }))
  }

  const addGalleryImage = (url: string) => {
    setConfig(prev => ({
      ...prev,
      images: {
        ...prev.images,
        galleryImages: [...(prev.images.galleryImages || []), url]
      }
    }))
  }

  const removeGalleryImage = (index: number) => {
    setConfig(prev => ({
      ...prev,
      images: {
        ...prev.images,
        galleryImages: (prev.images.galleryImages || []).filter((_, i) => i !== index)
      }
    }))
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {message && (
              <p className="text-destructive text-sm">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
            >
              Login
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Default password: admin123
            </p>
          </form>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "general", label: "General" },
    { id: "images", label: "Images & Logos" },
    { id: "hero", label: "Hero Banner" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" },
    { id: "colors", label: "Colors" }
  ]

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Site Administration</h1>
          <div className="flex items-center gap-4">
            {message && (
              <span className={`text-sm ${message.includes("success") ? "text-green-600" : "text-destructive"}`}>
                {message}
              </span>
            )}
            <button
              onClick={saveConfig}
              disabled={saving}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <a href="/" className="text-muted-foreground hover:text-foreground transition">
              View Site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <nav className="w-48 flex-shrink-0">
            <ul className="space-y-1">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted-foreground/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="flex-1 bg-card rounded-lg shadow p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">General Settings</h2>
                
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <input
                      type="text"
                      value={config.companyName}
                      onChange={e => updateConfig("companyName", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tagline</label>
                    <input
                      type="text"
                      value={config.tagline}
                      onChange={e => updateConfig("tagline", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="text"
                        value={config.phone}
                        onChange={e => updateConfig("phone", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={config.email}
                        onChange={e => updateConfig("email", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      value={config.address}
                      onChange={e => updateConfig("address", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ABN</label>
                      <input
                        type="text"
                        value={config.abn}
                        onChange={e => updateConfig("abn", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">NDIS Number</label>
                      <input
                        type="text"
                        value={config.ndisNumber}
                        onChange={e => updateConfig("ndisNumber", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <h3 className="text-md font-medium mt-4">Social Media Links</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Facebook</label>
                      <input
                        type="url"
                        value={config.socialMedia?.facebook || ""}
                        onChange={e => updateConfig("socialMedia.facebook", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Instagram</label>
                      <input
                        type="url"
                        value={config.socialMedia?.instagram || ""}
                        onChange={e => updateConfig("socialMedia.instagram", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={config.socialMedia?.linkedin || ""}
                        onChange={e => updateConfig("socialMedia.linkedin", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-8">
                <h2 className="text-lg font-semibold border-b pb-2">Images & Logos</h2>
                
                <div className="grid gap-8">
                  <div>
                    <h3 className="text-md font-medium mb-3">Logo</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your main logo displayed in the header and footer. Recommended size: 200x60px
                    </p>
                    <ImageUpload
                      currentImage={config.images?.logo}
                      onImageChange={url => updateConfig("images.logo", url)}
                      label="Company Logo"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-3">Hero Banner</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      The main banner image displayed at the top of your homepage. Recommended size: 1920x800px
                    </p>
                    <ImageUpload
                      currentImage={config.images?.heroBanner}
                      onImageChange={url => updateConfig("images.heroBanner", url)}
                      label="Hero Banner"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-3">About Section Image</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Image displayed in the About Us section. Recommended size: 600x400px
                    </p>
                    <ImageUpload
                      currentImage={config.images?.aboutImage}
                      onImageChange={url => updateConfig("images.aboutImage", url)}
                      label="About Image"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-3">Gallery Images</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Additional images to showcase your services and team in action.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {(config.images?.galleryImages || []).map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <ImageUpload
                      onImageChange={addGalleryImage}
                      label="Add Gallery Image"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hero" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">Hero Banner Settings</h2>
                
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={config.hero?.title || ""}
                      onChange={e => updateConfig("hero.title", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
                    <textarea
                      value={config.hero?.subtitle || ""}
                      onChange={e => updateConfig("hero.subtitle", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Text</label>
                      <input
                        type="text"
                        value={config.hero?.ctaText || ""}
                        onChange={e => updateConfig("hero.ctaText", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Link</label>
                      <input
                        type="text"
                        value={config.hero?.ctaLink || ""}
                        onChange={e => updateConfig("hero.ctaLink", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-3">Hero Background Image</h3>
                    <ImageUpload
                      currentImage={config.images?.heroBanner}
                      onImageChange={url => updateConfig("images.heroBanner", url)}
                      label="Hero Banner Image"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-lg font-semibold">Services</h2>
                  <button
                    onClick={addService}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition text-sm"
                  >
                    Add Service
                  </button>
                </div>
                
                <div className="space-y-6">
                  {config.services.map((service, index) => (
                    <div key={service.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Service {index + 1}</h3>
                        <button
                          onClick={() => removeService(index)}
                          className="text-destructive hover:text-destructive/80 transition"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="grid gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={e => updateService(index, "title", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea
                            value={service.description}
                            onChange={e => updateService(index, "description", e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Service Image</label>
                          <ImageUpload
                            currentImage={service.image}
                            onImageChange={url => updateService(index, "image", url)}
                            label="Service Image"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">About Section</h2>
                
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Section Title</label>
                    <input
                      type="text"
                      value={config.about?.title || ""}
                      onChange={e => updateConfig("about.title", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={config.about?.description || ""}
                      onChange={e => updateConfig("about.description", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Mission Statement</label>
                    <textarea
                      value={config.about?.mission || ""}
                      onChange={e => updateConfig("about.mission", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Core Values (comma-separated)</label>
                    <input
                      type="text"
                      value={(config.about?.values || []).join(", ")}
                      onChange={e => updateConfig("about.values", e.target.value.split(",").map(v => v.trim()))}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-3">About Section Image</h3>
                    <ImageUpload
                      currentImage={config.images?.aboutImage}
                      onImageChange={url => updateConfig("images.aboutImage", url)}
                      label="About Image"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-lg font-semibold">Team Members</h2>
                  <button
                    onClick={addTeamMember}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition text-sm"
                  >
                    Add Team Member
                  </button>
                </div>
                
                <div className="space-y-6">
                  {(config.team || []).map((member, index) => (
                    <div key={member.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Team Member {index + 1}</h3>
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="text-destructive hover:text-destructive/80 transition"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={e => updateTeamMember(index, "name", e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <input
                              type="text"
                              value={member.role}
                              onChange={e => updateTeamMember(index, "role", e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Bio</label>
                          <textarea
                            value={member.bio || ""}
                            onChange={e => updateTeamMember(index, "bio", e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Photo</label>
                          <ImageUpload
                            currentImage={member.image}
                            onImageChange={url => updateTeamMember(index, "image", url)}
                            label="Team Photo"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {(!config.team || config.team.length === 0) && (
                    <p className="text-muted-foreground text-center py-8">
                      No team members added yet. Click &quot;Add Team Member&quot; to get started.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">Contact Settings</h2>
                
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contact?.formEnabled ?? true}
                        onChange={e => updateConfig("contact.formEnabled", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Enable Contact Form</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contact?.mapEnabled ?? false}
                        onChange={e => updateConfig("contact.mapEnabled", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Enable Map</span>
                    </label>
                  </div>

                  {config.contact?.mapEnabled && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Google Maps Embed URL</label>
                      <input
                        type="url"
                        value={config.contact?.mapEmbedUrl || ""}
                        onChange={e => updateConfig("contact.mapEmbedUrl", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="https://www.google.com/maps/embed?pb=..."
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold border-b pb-2">Color Theme</h2>
                
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={config.colors?.primary || "#2563eb"}
                        onChange={e => updateConfig("colors.primary", e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.colors?.primary || "#2563eb"}
                        onChange={e => updateConfig("colors.primary", e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none w-32"
                      />
                      <span className="text-sm text-muted-foreground">Used for buttons, links, and accents</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={config.colors?.secondary || "#7c3aed"}
                        onChange={e => updateConfig("colors.secondary", e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.colors?.secondary || "#7c3aed"}
                        onChange={e => updateConfig("colors.secondary", e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none w-32"
                      />
                      <span className="text-sm text-muted-foreground">Used for secondary elements</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Accent Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={config.colors?.accent || "#f59e0b"}
                        onChange={e => updateConfig("colors.accent", e.target.value)}
                        className="w-16 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.colors?.accent || "#f59e0b"}
                        onChange={e => updateConfig("colors.accent", e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none w-32"
                      />
                      <span className="text-sm text-muted-foreground">Used for highlights and CTAs</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h3 className="text-sm font-medium mb-3">Preview</h3>
                    <div className="flex gap-4">
                      <button 
                        style={{ backgroundColor: config.colors?.primary }}
                        className="text-white px-4 py-2 rounded-lg"
                      >
                        Primary Button
                      </button>
                      <button 
                        style={{ backgroundColor: config.colors?.secondary }}
                        className="text-white px-4 py-2 rounded-lg"
                      >
                        Secondary Button
                      </button>
                      <button 
                        style={{ backgroundColor: config.colors?.accent }}
                        className="text-white px-4 py-2 rounded-lg"
                      >
                        Accent Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
