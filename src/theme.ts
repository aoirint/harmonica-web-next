"use client"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: "var(--font-noto-sans-jp)",
  },
})

export default theme
