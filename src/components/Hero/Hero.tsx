export function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-16 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground font-mono">
                Available for Product Collaborations
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-normal text-muted-foreground font-sans">
                Product Engineer
              </h2>
              <h1 className="text-6xl font-bold text-foreground font-serif">
                Alessandro Battiato
              </h1>
            </div>

            <div className="pt-8">
              <div className="border-t border-border pt-8">
                <p className="text-lg text-foreground leading-relaxed font-sans">
                  I don't simply build features: <span className="text-accent font-medium">
                    I ideate the product and scientifically analyze if it really
                    has solved the users' issues through data
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap gap-2">
              {
                [
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Python",
                  "Product Analytics",
                  "Mixpanel",
                  "AI Workflows",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground font-mono"
                  >
                    {tech}
                  </span>
                ))
              }
            </div>

            <div className="text-sm text-muted-foreground font-mono">
              Based in Catania, Italy · Full-Stack Product Development
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
