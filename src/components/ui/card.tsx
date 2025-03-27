
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { preset?: string }
>(({ className, preset, ...props }, ref) => {
  let presetClass = "";
  
  if (preset) {
    switch (preset) {
      case "pop-art":
        presetClass = "bg-gradient-to-br from-pink-400 to-purple-500 text-white";
        break;
      case "art-deco":
        presetClass = "bg-amber-50 border border-amber-200";
        break;
      case "glass":
        presetClass = "glass-card backdrop-blur";
        break;
      case "warm":
        presetClass = "bg-gradient-to-br from-orange-50 to-rose-100";
        break;
      case "minimal":
        presetClass = "bg-gray-50 border border-gray-200";
        break;
      case "dreamy":
        presetClass = "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
        break;
      case "nature":
        presetClass = "bg-gradient-to-br from-green-50 to-emerald-100";
        break;
      default:
        presetClass = "bg-white dark:bg-slate-900";
    }
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        presetClass,
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
