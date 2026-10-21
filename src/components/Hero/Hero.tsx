import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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
      className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-[100rem] flex-col justify-end px-6 pt-24 pb-16 lg:px-28 lg:pb-20"
    >
      <p className="flex items-center gap-3 font-mono text-xs tracking-wide text-accent sm:text-sm">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-status-available opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-status-available" />
        </span>
        Available for Product Collaborations
      </p>

      <p className="mt-8 font-serif text-4xl text-copy-muted italic sm:text-5xl lg:text-6xl">
        Product Engineer
      </p>
      <h1
        id="hero-title"
        className="mt-2 font-serif text-[clamp(3.5rem,12vw,10.5rem)] leading-[0.9] tracking-[-0.03em] text-copy-primary"
      >
        Alessandro Battiato
        <span className="text-accent" aria-hidden="true">
          .
        </span>
      </h1>

      <Separator className="mt-12 bg-border lg:mt-16" />

      <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <p className="max-w-2xl text-xl leading-snug text-copy-primary sm:text-2xl lg:text-[1.75rem]">
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
                  className="rounded-md border-border bg-surface-subtle px-3 py-1.5 font-mono text-xs font-normal text-copy-secondary sm:text-sm"
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
    </section>
  );
}

export default Hero;
