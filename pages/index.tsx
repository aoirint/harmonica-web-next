import Head from 'next/head'
import { hasToken } from '../lib/auth'
import { useEffect, useState } from 'react'
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
import assert from 'assert'
import TrafficChart from '../lib/components/chart/traffic_chart'

export default function HomePage() {
  const router = useRouter()

  const smokePingNames = process.env.NEXT_PUBLIC_SMOKEPING_NAMES?.split(',') ?? []
  const smokePingUrls = process.env.NEXT_PUBLIC_SMOKEPING_URLS?.split(',') ?? []
  const smokePingTargets = process.env.NEXT_PUBLIC_SMOKEPING_TARGETS?.split(',') ?? []
  assert(smokePingUrls.length == smokePingTargets.length)

  const smokePingEntries = Array.from(Array(smokePingUrls.length).keys()).map((index) => ({
    name: smokePingNames[index],
    url: smokePingUrls[index],
    target: smokePingTargets[index],
  }))

  const [currentTimestamp, setCurrentTimestamp] = useState(dayjs().unix())

  const nowDayjs = dayjs.unix(currentTimestamp).tz()
  const startDayjs = nowDayjs.subtract(6, 'hour')

  const { data } = useGetMonitorQuery({
    variables: {
      timestampComp: {
        _gte: startDayjs.format(),
        _lt: nowDayjs.format()
      }
    },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (! hasToken()) {
      router.push('/login')
    }
  })

  // Refresh data every 1 minute
  // Reload page every 60 minutes
  useEffect(() => {
    const refreshIntervalId = setInterval(() => {
      setCurrentTimestamp(dayjs().unix())
    }, 60 * 1000)

    const reloadIntervalId = setInterval(() => {
      location.reload()
    }, 60 * 60 * 1000)

    return () => {
      clearInterval(refreshIntervalId)
      clearInterval(reloadIntervalId)
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
        <Container component="main" maxWidth={false} sx={{ mt: 3, flexGrow: 1 }}>
          <Toolbar />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Light / %</Typography>
              <LightChart lightData={data?.light ?? []} />
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Humidity / %</Typography>
              <HumidityChart humidityData={data?.humidity ?? []} />
            </Grid> */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Temperature / ℃</Typography>
              <TemperatureChart temperatureData={data?.temperature ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>CO2 / ppm</Typography>
              <Co2Chart co2Data={data?.mhz19Co2 ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Traffic / bytes</Typography>
              <TrafficChart trafficData={data?.l12TrafficDaily ?? []} />
            </Grid>
            {smokePingEntries.map((smokePing, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>{smokePing.name}</Typography>
                <SmokePingChartImage
                  smokePingUrl={smokePing.url}
                  smokePingTarget={smokePing.target}
                  timestampEpoch={nowDayjs.unix()}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
