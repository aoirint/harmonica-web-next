import { AppBar, Toolbar, Typography } from "@mui/material"
// import MenuIcon from '@mui/icons-material/Menu'
import AccountMenuIcon from "./account_menu_icon"
import ConfigMenuIcon from "./config_menu_icon"

interface MainAppBarProps {
  onDurationChanged: (duration: number) => void
}

export default function MainAppBar({ onDurationChanged }: MainAppBarProps) {
  return (
    <AppBar component="nav" position="fixed" sx={{ zIndex: 9999 }}>
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Harmonica
        </Typography>
        {/* <Box>
          <Button sx={{ color: '#fff' }}>
            License
          </Button>
        </Box> */}
        <AccountMenuIcon />
        <ConfigMenuIcon onDurationChanged={onDurationChanged} />
      </Toolbar>
    </AppBar>
  )
}
