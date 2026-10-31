import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

interface Discipline {
  index: string;
  title: string;
  description: string;
  skills: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    index: "01",
    title: "Product",
    description:
      "I start with real-world friction and the people experiencing it. Before defining the technical scope, I identify the user behavior we want to change and how we'll measure success.",
    skills: ["Problem Framing", "User Research", "Value Proposition"],
  },
  {
    index: "02",
    title: "Engineering",
    description:
      "I build maintainable, scalable solutions by choosing the right tools and architectural patterns for the problem at hand. Every technical decision serves a clear product requirement, balancing performance, reliability, and long-term maintainability.",
    skills: ["React & TypeScript", "System Design", "API Integration"],
  },
  {
    index: "03",
    title: "Analytics",
    description:
      "I leverage Mixpanel to instrument meaningful user interactions, track behavioral patterns, and understand how people engage with a product. Events, funnels, and adoption metrics help validate assumptions, uncover friction points, and inform data-driven product decisions.",
    skills: ["Mixpanel", "Event Tracking", "Funnel Analysis"],
  },
  {
    index: "04",
    title: "AI Workflows",
    description:
      "I use AI agents as an integral part of my development workflow, combining spec-driven development, structured context, and iterative validation. Clear specifications guide implementation, while human judgment ensures code quality, architectural consistency, and alignment with product goals.",
    skills: ["Spec-Driven Development", "AI Agents", "Context Engineering"],
  },
];

function Method() {
  return (
    <section
      id="how-i-work"
      aria-labelledby="method-title"
      className="bg-surface-band"
    >
      <div className="mx-auto max-w-page gutter-content py-24 lg:py-32">
        <div className="flex items-center gap-6">
          <p className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs tracking-label text-accent uppercase sm:text-sm">
            <span>02 — Method &amp; Philosophy</span>
            <span>Integrated Execution</span>
          </p>
          <Separator className="min-w-8 flex-1" />
        </div>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="method-title"
              className="font-serif text-heading text-copy-primary"
            >
              Four disciplines. One continuous feedback loop.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-copy-muted sm:text-xl">
              No boundaries between design specs, code, and analytics
              tracking. Every line of code is written with the metric it is
              meant to validate in mind.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue={DISCIPLINES[0].index}
            className="border-t lg:col-span-7"
          >
            {DISCIPLINES.map((discipline) => (
              <AccordionItem key={discipline.index} value={discipline.index}>
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full cursor-pointer items-center gap-4 py-8 text-left sm:gap-6 lg:py-10">
                    <span className="font-mono text-sm text-accent">
                      {discipline.index}
                    </span>
                    <span className="flex-1 font-serif text-4xl text-copy-muted transition-colors group-hover:text-copy-primary group-data-[state=open]:text-copy-primary sm:text-5xl xl:text-6xl">
                      {discipline.title}
                    </span>
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border text-copy-primary transition-colors group-data-[state=open]:border-accent group-data-[state=open]:bg-accent-soft group-data-[state=open]:text-accent"
                      aria-hidden="true"
                    >
                      <Plus className="size-4 motion-safe:transition-transform motion-safe:duration-200 group-data-[state=open]:rotate-45" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-10">
                  <p className="max-w-3xl text-lg leading-relaxed text-copy-muted">
                    {discipline.description}
                  </p>
                  <ul
                    aria-label={`${discipline.title} skills`}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {discipline.skills.map((skill) => (
                      <li key={skill}>
                        <Badge
                          variant="outline"
                          className="rounded-md border-accent-border bg-accent-soft px-3 py-1.5 font-mono text-xs font-normal text-accent sm:text-sm"
                        >
                          {skill}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Method;
