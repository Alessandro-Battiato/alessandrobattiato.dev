### Method Section

Create `src/sections/Method.tsx`.

Requirements:

- when dark theme is active, the background color should be #0C1015 while for the light theme, it should be #F1F5F9, in order to guarantee a subtle yet strong contrast compared to the adjacent sections. These colors should also be stored as tokens.
- the expected contents of the section are as following:
  - an opening uppercase but small title: "02 - Method & Philosophy Integrated Execution" using text-accent as text color, and a separator line immediately after
  - a bigger section title: "Four disciplines. One continuous feedback loop."
  - a smaller section subtitle: "No boundaries between design specs, code, and analytics tracking. Every line of code is written with the metric it is meant to validate in mind."
  - on the right, an accordion where each option is divided by separator lines, and a single option contains a title, subtitle and a set of chips. The accordion should have the following content:
    - 01 Product: I start with real-world friction and the people experiencing it. Before defining the technical scope, I identify the user behavior we want to change and how we'll measure success.
      Chips: Problem Framing, User Research, Value Proposition.
    - 02 Engineering: I build maintainable, scalable solutions by choosing the right tools and architectural patterns for the problem at hand. Every technical decision serves a clear product requirement, balancing performance, reliability, and long-term maintainability.
      Chips: React & TypeScript, System Design, API Integration.
    - 03 Analytics: I leverage Mixpanel to instrument meaningful user interactions, track behavioral patterns, and understand how people engage with a product. Events, funnels, and adoption metrics help validate assumptions, uncover friction points, and inform data-driven product decisions.
      Chips: Mixpanel, Event Tracking, Funnel Analysis.
    - 04 AI Workflows: I use AI agents as an integral part of my development workflow, combining spec-driven development, structured context, and iterative validation. Clear specifications guide implementation, while human judgment ensures code quality, architectural consistency, and alignment with product goals.
      Chips: Spec-Driven Development, AI Agents, Context Engineering.

Use the provided 'method-dark.png' screenshot inside the 'src/assets' folder as a visual reference.

### Check when done

- new components compile without TypeScript errors
- no lint errors
