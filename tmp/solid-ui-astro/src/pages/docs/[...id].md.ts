import { getCollection, type CollectionEntry } from "astro:content"

import { toRouteId } from "~/lib/docs"
import { readMdx, transformMdx } from "~/lib/transformers/mdx"

export async function getStaticPaths() {
  const pages = await getCollection("docs")

  return pages.map((page) => {
    const routeId = toRouteId(page.id)

    return {
      params: { id: routeId || "index" },
      props: { page }
    }
  })
}

type DocsPage = CollectionEntry<"docs">

export async function GET({ props }: { props: { page: DocsPage } }) {
  const sourceContent = await readMdx(props.page.id)
  const content = await transformMdx(sourceContent)

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  })
}
