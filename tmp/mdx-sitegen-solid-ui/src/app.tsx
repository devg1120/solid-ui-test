// @refresh reload
import { Suspense } from "solid-js"
import { isServer } from "solid-js/web"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { MDXProvider } from "solid-mdx"

import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core"
import { getCookie } from "vinxi/http"

import { MetaTags } from "~/components/meta-tags"
import { LayoutProvider } from "~/components/layout-provider"
import { DynamicLayout } from "~/components/dynamic-layout"
import { RouteLayoutManager } from "./components/route-layout-manager"
import { MDXComponents } from "~/components/mdx-components"

import "~/styles/app.css"

function getServerCookies() {
  "use server"
  const colorMode = getCookie("kb-color-mode")
  return colorMode ? `kb-color-mode=${colorMode}` : ""
}

export default function App() {
  const storageManager = cookieStorageManagerSSR(isServer ? getServerCookies() : document.cookie)
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <MetaTags />
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>\
            
            <LayoutProvider>
              <MDXProvider components={MDXComponents}>
                <RouteLayoutManager>
                  <DynamicLayout>
                    <Suspense>{props.children}</Suspense>
                  </DynamicLayout>
                </RouteLayoutManager>
              </MDXProvider>
            </LayoutProvider>
          </ColorModeProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
