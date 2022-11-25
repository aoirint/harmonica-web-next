import Head from 'next/head'
import { hasToken } from '../lib/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import MainAppBar from '../lib/components/app_bar/main_app_bar'
import MainDrawer from '../lib/components/drawer/main_drawer'
import { useGetMonitorQuery } from '../lib/graphql-types'
import dayjs from 'dayjs'
import Co2Chart from '../lib/components/chart/co2_chart'

export default function HomePage() {
  const router = useRouter()
  const nowDayjs = dayjs().tz()
  const yesterdayDayjs = nowDayjs.subtract(1, 'day')

  const { data } = useGetMonitorQuery({
    variables: {
      timestampComp: {
        _gte: yesterdayDayjs.format(),
        _lt: nowDayjs.format()
      }
    }
  })

  useEffect(() => {
    if (! hasToken()) {
      router.push('/login')
    }
  })

  return (
    <div>
      <Head>
        <title>Harmonica</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MainAppBar />
        <MainDrawer />
        <Container component="main" sx={{ mt: 3, flexGrow: 1 }}>
          <Toolbar />
          <Typography variant="h5" component="h2">Light</Typography>
          <Typography paragraph>
            {data?.light?.map((light) => (
              <>
                {light.value},
              </>
            ))}
          </Typography>
          <Typography variant="h5" component="h2">Humidity</Typography>
          <Typography paragraph>
            {data?.humidity?.map((humidity) => (
              <>
                {humidity.value},
              </>
            ))}
          </Typography>
          <Typography variant="h5" component="h2">Temperature</Typography>
          <Typography paragraph>
            {data?.temperature?.map((temperature) => (
              <>
                {temperature.value},
              </>
            ))}
          </Typography>
          <Typography variant="h5" component="h2">CO2</Typography>
          <Typography paragraph>
            {data?.mhz19Co2?.map((co2) => (
              <>
                {co2.value},
              </>
            ))}
          </Typography>
          <Co2Chart co2Data={data?.mhz19Co2 ?? []} />
        </Container>
      </Box>
    </div>
  )
}
