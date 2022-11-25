import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu'
import AccountMenuIcon from './account_menu_icon'

export default function MainAppBar() {
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
      </Toolbar>
    </AppBar>
  )
}
