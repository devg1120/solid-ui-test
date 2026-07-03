import { onMount } from "solid-js"
import { useLayout } from "~/components/layout-provider"

interface FrontmatterLayoutProps {
  frontmatter?: {
    layout?: string
    title?: string
    description?: string
    [key: string]: any
  }
}

export function FrontmatterLayout(props: FrontmatterLayoutProps) {
  const { setLayoutConfig } = useLayout()
  
  onMount(() => {
    if (props.frontmatter) {
      setLayoutConfig(props.frontmatter)
    }
  })
  
  return null
}

// Alternative component that can be used without frontmatter prop
export function SetLayout(props: { layout: string }) {
  const { setLayoutConfig } = useLayout()
  
  onMount(() => {
    setLayoutConfig({ layout: props.layout })
  })
  
  return null
}
