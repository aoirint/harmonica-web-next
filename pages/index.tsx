import Head from 'next/head'
import { hasToken } from '../lib/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, CssBaseline, Grid, Toolbar, Typography } from '@mui/material'
import MainAppBar from '../lib/components/app_bar/main_app_bar'
import MainDrawer from '../lib/components/drawer/main_drawer'
import { useGetMonitorQuery } from '../lib/graphql-types'
import dayjs from 'dayjs'
import Co2Chart from '../lib/components/chart/co2_chart'
import TemperatureChart from '../lib/components/chart/temperature_chart'
import LightChart from '../lib/components/chart/light_chart'
import HumidityChart from '../lib/components/chart/humidity_chart'
import SmokePingChartImage from '../lib/components/smoke_ping_chart_image'

export default function HomePage() {
  const router = useRouter()
  const nowDayjs = dayjs().tz()
  const startDayjs = nowDayjs.subtract(6, 'hour')

  const { data } = useGetMonitorQuery({
    variables: {
      timestampComp: {
        _gte: startDayjs.format(),
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
        {/* <MainDrawer /> */}
        <Container component="main" sx={{ mt: 3, flexGrow: 1 }}>
          <Toolbar />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" component="h2">Light</Typography>
              <LightChart lightData={data?.light ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" component="h2">Humidity</Typography>
              <HumidityChart humidityData={data?.humidity ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" component="h2">Temperature</Typography>
              <TemperatureChart temperatureData={data?.temperature ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" component="h2">CO2</Typography>
              <Co2Chart co2Data={data?.mhz19Co2 ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" component="h2">Ping</Typography>
              <SmokePingChartImage timestampEpoch={nowDayjs.unix()} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
