import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import "./init-client"

import { InitColorSchemeScript } from "@mui/material"
import theme from "../theme"
import ApolloProviderClient from "./apollo-provider"

const notoSansJp = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"],
  preload: false,
  display: "swap",
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "Harmonica",
  description: "Harmonica Web Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={notoSansJp.variable} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <InitColorSchemeScript attribute="class" />
            <CssBaseline />
            <ApolloProviderClient>{children}</ApolloProviderClient>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
