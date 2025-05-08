"use client"

import { useTheme } from "@/components/theme/theme-provider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div 
      className="w-[60px] h-[30px] bg-muted rounded-full p-[5px] flex items-center cursor-pointer relative transition-all border border-border"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      <div 
        className={`absolute w-[20px] h-[20px] bg-primary rounded-full transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          theme === "dark" ? "left-[5px]" : "left-[calc(100%-25px)]"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={12} className="absolute inset-0 m-auto text-white" />
        ) : (
          <Sun size={12} className="absolute inset-0 m-auto text-white" />
        )}
      </div>
    </div>
  )
}