import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefix a path with the app base (useful for GitHub Pages subpaths)
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/'
  if (!path) return base
  // Ensure exactly one slash between
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
