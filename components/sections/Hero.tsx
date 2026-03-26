import type { SiteConfig } from "@/lib/types"

interface HeroProps {
  config: SiteConfig
}

export function Hero({ config }: HeroProps) {
  const hasBackgroundImage = config.images?.heroBanner

  return (
    <section
      className="relative min-h-[500px] md:min-h-[600px] flex items-center"
      style={{
        backgroundColor: hasBackgroundImage ? undefined : (config.colors?.primary || "#2563eb")
      }}
    >
      {hasBackgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${config.images?.heroBanner})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
          {config.hero?.title || "Your Trusted NDIS Support Partner"}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
          {config.hero?.subtitle || "We help you navigate the NDIS with confidence and care"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={config.hero?.ctaLink || "#contact"}
            className="px-8 py-4 rounded-lg text-lg font-semibold transition hover:opacity-90"
            style={{ 
              backgroundColor: config.colors?.accent || "#f59e0b",
              color: "#fff"
            }}
          >
            {config.hero?.ctaText || "Get Started Today"}
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-lg text-lg font-semibold bg-white/20 text-white border-2 border-white hover:bg-white hover:text-gray-900 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
