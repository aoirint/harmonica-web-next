import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

export default function AnonymousAppBar() {
  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Login
        </Typography>
        <Box>
          <Button sx={{ color: '#fff' }}>
            License
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
