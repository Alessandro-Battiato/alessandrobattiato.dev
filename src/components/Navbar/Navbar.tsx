import { useTheme } from 'next-themes';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">Alessandro Battiato</h1>
          <span className="text-xs text-accent uppercase tracking-wide font-mono">Catania · Product Eng</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#intro" className="text-sm text-accent font-mono hover:text-accent/80 transition-colors">01 Intro</a>
          <a href="#how-i-work" className="text-sm text-accent font-mono hover:text-accent/80 transition-colors">02 How I Work</a>
          <a href="#case-study" className="text-sm text-accent font-mono hover:text-accent/80 transition-colors">03 Case Study</a>
          <a href="#experience" className="text-sm text-accent font-mono hover:text-accent/80 transition-colors">04 Experience</a>
          <a href="#now" className="text-sm text-accent font-mono hover:text-accent/80 transition-colors">05 Now</a>
          <a href="#talk" className="text-sm text-accent font-mono hover:text-accent/80 transition-colors">06 Talk</a>
        </div>
        <ThemeToggleButton />
      </div>
    </nav>
  );
}

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
    >
      <span className="text-white text-xl font-bold">☀</span>
    </button>
  );
};