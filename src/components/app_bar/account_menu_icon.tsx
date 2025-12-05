import { useApolloClient } from "@apollo/client"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { setToken } from "@/lib/auth"

export default function AccountMenuIcon() {
  const apolloClient = useApolloClient()

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = (): void => {
    apolloClient.clearStore()
    setToken(null)
    router.push("/login")
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircleIcon />
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
