import { useApolloClient } from "@apollo/client"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

interface ConfigMenuIconProps {
  onDurationChanged: (duration: number) => void
}

export default function ConfigMenuIcon({
  onDurationChanged,
}: ConfigMenuIconProps) {
  const apolloClient = useApolloClient()

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="settings"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ zIndex: 9999 + 1 }}
      >
        <MenuItem
          onClick={() => {
            onDurationChanged(6 * 3600)
          }}
        >
          6h
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDurationChanged(12 * 3600)
          }}
        >
          12h
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDurationChanged(24 * 3600)
          }}
        >
          24h
        </MenuItem>
      </Menu>
    </Box>
  )
}
