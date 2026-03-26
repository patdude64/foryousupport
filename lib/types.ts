export interface SiteConfig {
  companyName: string
  tagline: string
  phone: string
  email: string
  address: string
  abn: string
  ndisNumber: string
  socialMedia: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  images: {
    logo?: string
    heroBanner?: string
    aboutImage?: string
    teamPhotos?: string[]
    serviceImages?: Record<string, string>
    galleryImages?: string[]
  }
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
  services: Array<{
    id: string
    title: string
    description: string
    icon: string
    image?: string
  }>
  about: {
    title: string
    description: string
    mission: string
    values: string[]
  }
  team: Array<{
    id: string
    name: string
    role: string
    bio: string
    image?: string
  }>
  testimonials: Array<{
    id: string
    text: string
    author: string
    role: string
    rating: number
    image?: string
  }>
  contact: {
    formEnabled: boolean
    mapEnabled: boolean
    mapEmbedUrl?: string
  }
}

export const defaultConfig: SiteConfig = {
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
    mapEnabled: false,
    mapEmbedUrl: ""
  }
}
