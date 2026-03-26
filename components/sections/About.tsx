import type { SiteConfig } from "@/lib/types"

interface AboutProps {
  config: SiteConfig
}

export function About({ config }: AboutProps) {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {config.about?.title || "About Us"}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {config.about?.description}
            </p>
            
            {config.about?.mission && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">{config.about.mission}</p>
              </div>
            )}

            {config.about?.values && config.about.values.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                <div className="flex flex-wrap gap-2">
                  {config.about.values.map((value, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${config.colors?.primary}15` || "#2563eb15",
                        color: config.colors?.primary || "#2563eb"
                      }}
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            {config.images?.aboutImage ? (
              <img
                src={config.images.aboutImage}
                alt="About us"
                className="rounded-2xl shadow-lg w-full"
              />
            ) : (
              <div 
                className="aspect-4/3 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${config.colors?.primary}15` || "#2563eb15" }}
              >
                <svg 
                  className="w-24 h-24 opacity-50" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: config.colors?.primary || "#2563eb" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {config.images?.galleryImages && config.images.galleryImages.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {config.images.galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
