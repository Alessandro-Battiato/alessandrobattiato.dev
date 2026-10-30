import Hero from './sections/Hero'
import Navbar from './layout/Navbar'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
      </main>
    </>
  )
}

export default App
