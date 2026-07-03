// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          {assets}
          <link
            rel="preload"
            href="/fonts/Geist.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/GeistMono.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
        </head>
        <body class="min-h-screen bg-background font-sans antialiased">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
