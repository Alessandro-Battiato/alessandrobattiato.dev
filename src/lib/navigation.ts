export interface NavLink {
  index: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { index: "01", label: "Intro", href: "#intro" },
  { index: "02", label: "How I Work", href: "#how-i-work" },
  { index: "03", label: "Case Study", href: "#case-study" },
  { index: "04", label: "Experience", href: "#experience" },
  { index: "05", label: "Now", href: "#now" },
  { index: "06", label: "Talk", href: "#talk" },
];
