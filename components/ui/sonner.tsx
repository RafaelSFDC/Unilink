"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "hsl(142 76% 36%)",
          "--success-text": "hsl(355 7% 97%)",
          "--success-border": "hsl(142 76% 36%)",
          "--loading-bg": "hsl(217 91% 60%)",
          "--loading-text": "hsl(355 7% 97%)",
          "--loading-border": "hsl(217 91% 60%)",
          "--info-bg": "hsl(239 84% 67%)",
          "--info-text": "hsl(355 7% 97%)",
          "--info-border": "hsl(239 84% 67%)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
