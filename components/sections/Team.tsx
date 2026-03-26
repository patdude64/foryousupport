import type { SiteConfig } from "@/lib/types"

interface TeamProps {
  config: SiteConfig
}

export function Team({ config }: TeamProps) {
  if (!config.team || config.team.length === 0) return null

  return (
    <section id="team" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our dedicated team of support coordinators is here to help you achieve your goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {config.team.map(member => (
            <div
              key={member.id}
              className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div 
                  className="w-full h-64 flex items-center justify-center"
                  style={{ backgroundColor: `${config.colors?.primary}15` || "#2563eb15" }}
                >
                  <svg 
                    className="w-20 h-20 opacity-50" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: config.colors?.primary || "#2563eb" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ color: config.colors?.primary || "#2563eb" }}
                >
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
