import { SiteConfig, defaultConfig } from "./types"

// In-memory store for the config (persists during server runtime)
// In production, you'd want to use a database
let currentConfig: SiteConfig = JSON.parse(JSON.stringify(defaultConfig))

export function getConfig(): SiteConfig {
  return currentConfig
}

export function setConfig(newConfig: SiteConfig): void {
  currentConfig = newConfig
}

export function updateConfig(updates: Partial<SiteConfig>): SiteConfig {
  currentConfig = { ...currentConfig, ...updates }
  return currentConfig
}
