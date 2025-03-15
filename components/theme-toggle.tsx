"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" disabled>
        <Sun className="h-5 w-5 text-primary" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10"></div>
      <div className="relative z-10 transition-all duration-500">
        <Sun
          className={`h-5 w-5 text-primary transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
        />
        <Moon
          className={`absolute top-0 left-0 h-5 w-5 text-primary transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

