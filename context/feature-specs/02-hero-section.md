### Navbar

Create `src/components/Navbar/Navbar.tsx`.

Requirements:

- fixed-height top navbar
- the contents of the navbar are as following:
  - "Alessandro Battiato" using the white token color, followed by a badge saying "Catania · Product Eng" all uppercase, using the accent token colors.
  - enumerated link sections that make the user navigate to the related section, the numbers use the token accent color:
    - 01 Intro
    - 02 How I Work
    - 03 Case Study
    - 04 Experience
    - 05 Now
    - 06 Talk
  - A button that switches the existing theme which says "Dark Mode" or "Light Mode" accordingly to the current activated mode, also has a pulse accent token colored ball.

### Hero Section

Create `src/components/Hero/Hero.tsx`.

Requirements:

- left section contains the following:
  - pulse green ball beside an helper text saying: "Available for Product Collaborations"
  - subtitle saying: "Product Engineer"
  - title saying: "Alessandro Battiato"
- then we have a separator for the following items:
  - on the left, a paragraph saying: "I don't simply build features: I ideate the product and scientifically analyze if it really has - solved the users' issues through data" and highlight the "I ideate the product and scientifically analyze" words using the accent - token color in index.css
- on the right, we have a set of badges, describing the stack the developer uses: React, TypeScript, Next.js, Python, Product Analytics, Mixpanel, AI Workflows.
  - beneath the stack we have an helper text saying: "Based in Catania, Italy · Full-Stack Product Development "

### Check when done

- new components compile without TypeScript errors
- no lint errors
