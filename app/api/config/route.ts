import { NextRequest, NextResponse } from "next/server"
import { getConfig, setConfig } from "@/lib/config-store"
import { SiteConfig } from "@/lib/types"

export async function GET() {
  const config = getConfig()
  return NextResponse.json(config)
}

export async function POST(request: NextRequest) {
  try {
    const newConfig: SiteConfig = await request.json()
    setConfig(newConfig)
    return NextResponse.json({ success: true, config: newConfig })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid configuration data" },
      { status: 400 }
    )
  }
}
