import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

const STACK: string[] = [
  "React",
  "TypeScript",
  "Next.js",
  "Python",
  "Product Analytics",
  "Mixpanel",
  "AI Workflows",
];

function Hero() {
  return (
    <section
      id="intro"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <div className="hero-glow" aria-hidden="true" />

      <div className="mx-auto flex min-h-below-nav max-w-page flex-col justify-end gutter-content pt-24 pb-16 lg:pb-20">
        <p className="flex items-center gap-4 pl-1 font-mono text-sm tracking-wider text-accent sm:text-base">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-status-available opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2.5 rounded-full bg-status-available" />
          </span>
          Available for Product Collaborations
        </p>

        <p className="mt-8 pl-1 font-serif text-4xl text-copy-muted italic sm:text-5xl lg:text-6xl">
          Product Engineer
        </p>
        <h1
          id="hero-title"
          className="mt-2 font-serif text-display text-copy-primary"
        >
          Alessandro Battiato
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </h1>

        <Separator className="mt-12 lg:mt-16" />

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <p className="max-w-2xl text-xl leading-snug text-copy-primary sm:text-2xl lg:text-lead">
            I don't simply build features:{" "}
            <span className="font-medium text-accent">
              I ideate the product and scientifically analyze
            </span>{" "}
            if it really has solved the users' issues through data.
          </p>

          <div>
            <ul aria-label="Technology stack" className="flex flex-wrap gap-2">
              {STACK.map((item) => (
                <li key={item}>
                  <Badge
                    variant="outline"
                    className="rounded-md border-border-subtle bg-surface px-3 py-1.5 font-mono text-xs font-normal text-copy-secondary sm:text-sm"
                  >
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-xs tracking-wide text-copy-muted sm:text-sm">
              Based in Catania, Italy · Full-Stack Product Development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
