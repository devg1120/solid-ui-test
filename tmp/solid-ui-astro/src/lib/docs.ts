import { getCollection, type CollectionEntry } from "astro:content"

export type DocsPage = CollectionEntry<"docs">

export type SidebarLink = {
  title: string
  href: string
}

export type SidebarData = {
  topLevel: SidebarLink[]
  components: SidebarLink[]
}

const DOC_EXTENSION_PATTERN = /\.mdx?$/

export function toRouteId(id: string) {
  const routeId = id.replace(DOC_EXTENSION_PATTERN, "")

  if (routeId === "index") {
    return ""
  }

  if (routeId.endsWith("/index")) {
    return routeId.slice(0, -"/index".length)
  }

  return routeId
}

export async function getDocsPages(): Promise<DocsPage[]> {
  return (await getCollection("docs")).sort((a, b) => {
    const aRouteId = toRouteId(a.id)
    const bRouteId = toRouteId(b.id)

    if (aRouteId === "") {
      return -1
    }

    if (bRouteId === "") {
      return 1
    }

    return aRouteId.localeCompare(bRouteId)
  })
}

export function toDocsPath(routeId: string) {
  return routeId ? `/docs/${routeId}` : "/docs"
}

export async function getNeighbors(id: string) {
  const pages = await getDocsPages()
  const index = pages.findIndex((page) => toRouteId(page.id) === id)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: pages[index - 1] ?? null,
    next: pages[index + 1] ?? null
  }
}

export async function getComponentNeighbors(id: string) {
  const components = (await getDocsPages()).filter((page) => page.data.component)
  const index = components.findIndex((page) => toRouteId(page.id) === id)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: components[index - 1] ?? null,
    next: components[index + 1] ?? null
  }
}

export async function getTopLevelSections(): Promise<SidebarLink[]> {
  const pages = await getDocsPages()
  const roots = pages
    .filter((page) => !toRouteId(page.id).includes("/"))
    .map((page) => ({
      title: page.data.title,
      href: toDocsPath(toRouteId(page.id))
    }))
    .sort((a, b) => {
      if (a.href === "/docs") {
        return -1
      }

      if (b.href === "/docs") {
        return 1
      }

      return a.title.localeCompare(b.title)
    })

  return roots
}

export async function getComponentLinks(): Promise<SidebarLink[]> {
  const pages = await getDocsPages()
  return pages
    .filter((page) => page.data.component)
    .map((page) => ({
      title: page.data.title,
      href: toDocsPath(toRouteId(page.id))
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export async function getSidebarData(): Promise<SidebarData> {
  const [topLevel, components] = await Promise.all([getTopLevelSections(), getComponentLinks()])

  return {
    topLevel,
    components
  }
}
