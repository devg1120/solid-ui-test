import { createEffect, onCleanup, type ParentProps } from "solid-js"
import { useLocation } from "@solidjs/router"
import { useLayout } from "~/components/layout-provider"

/**
 * Component that manages layout based on route changes
 * Automatically sets appropriate layouts for different routes
 */
export function RouteLayoutManager(props: ParentProps) {
  const location = useLocation()
  const { setLayoutConfig } = useLayout()

  createEffect(() => {
    const pathname = location.pathname
    
    // Set layout based on route
    if (pathname === "/") {
      setLayoutConfig({ layout: "home" })
    } else if (pathname.startsWith("/docs")) {
      setLayoutConfig({ layout: "default" })
    } else {
      setLayoutConfig({ layout: "default" })
    }
  })

  return <>{props.children}</>
}
