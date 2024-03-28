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

  const temperatureOffsetString = process.env.NEXT_PUBLIC_TEMPERATURE_OFFSET ?? "0.0"
  const temperatureOffset = parseFloat(temperatureOffsetString)

  const humidityOffsetString = process.env.NEXT_PUBLIC_HUMIDITY_OFFSET ?? "0.0"
  const humidityOffset = parseFloat(humidityOffsetString)

  const [currentTimestamp, setCurrentTimestamp] = useState(dayjs().unix())
  const [durationSeconds, setDurationSeconds] = useState(6 * 3600)

  const nowDayjs = dayjs.unix(currentTimestamp).tz()
  const startDayjs = nowDayjs.subtract(durationSeconds, 'second')
  const weekAgoDayjs = nowDayjs.subtract(1, 'week')

  const { data } = useGetMonitorQuery({
    variables: {
      timestampComp: {
        _gte: startDayjs.format(),
        _lt: nowDayjs.format()
      },
      timestampWeekComp: {
        _gte: weekAgoDayjs.format(),
        _lt: nowDayjs.format()
      }
    },
    fetchPolicy: 'no-cache'
  })

  const minimumCo2ValueInWeek = data?.mhz19Co2Aggregate?.aggregate?.min?.value ?? 0

  // 7日間の最小値を400ppmとみなす
  const co2Offset = 400 - minimumCo2ValueInWeek

  const calibratedData = {
    light: data?.light,
    temperature: data?.temperature?.map((temperature) => ({
      timestamp: temperature.timestamp,
      value: temperature.value + temperatureOffset,
    })),
    humidity: data?.humidity?.map((humidity) => ({
      timestamp: humidity.timestamp,
      value: humidity.value + humidityOffset,
    })),
    mhz19Co2: data?.mhz19Co2?.map((mhz19Co2) => ({
      timestamp: mhz19Co2.timestamp,
      value: mhz19Co2.value + co2Offset,
    })),
    l12TrafficDaily: data?.l12TrafficDaily,
  }

  const lightDataCount = calibratedData?.light?.length ?? 0
  const lastLightValue = lightDataCount > 0 ? calibratedData?.light?.[lightDataCount - 1]?.value : undefined

  const temperatureDataCount = calibratedData?.temperature?.length ?? 0
  const lastTemperatureValue = temperatureDataCount > 0 ? calibratedData?.temperature?.[temperatureDataCount - 1]?.value : undefined

  const humidityDataCount = calibratedData?.humidity?.length ?? 0
  const lastHumidityValue = humidityDataCount > 0 ? calibratedData?.humidity?.[humidityDataCount - 1]?.value : undefined

  const co2DataCount = calibratedData?.mhz19Co2?.length ?? 0
  const lastCo2Value = co2DataCount > 0 ? calibratedData?.mhz19Co2?.[co2DataCount - 1]?.value : undefined

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
        <MainAppBar
          onDurationChanged={(duration) => {
            setDurationSeconds(duration)
          }}
        />
        {/* <MainDrawer /> */}
        <Container component="main" maxWidth={false} sx={{ mt: 3, flexGrow: 1 }}>
          <Toolbar />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Light / {lastLightValue?.toFixed(0)} %</Typography>
              <LightChart lightData={calibratedData?.light ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Humidity / {lastHumidityValue?.toFixed(0)} %</Typography>
              <HumidityChart humidityData={calibratedData?.humidity ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Temperature / {lastTemperatureValue?.toFixed(1)} ℃</Typography>
              <TemperatureChart temperatureData={calibratedData?.temperature ?? []} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>CO2 / {lastCo2Value?.toFixed(0)} ppm</Typography>
              <Co2Chart co2Data={calibratedData?.mhz19Co2 ?? []} />
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Traffic / GiB</Typography>
              <TrafficChart trafficData={calibratedData?.l12TrafficDaily ?? []} />
            </Grid> */}
            {smokePingEntries.map((smokePing, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>{smokePing.name}</Typography>
                <SmokePingChartImage
                  smokePingUrl={smokePing.url}
                  smokePingTarget={smokePing.target}
                  timestampStartEpoch={startDayjs.unix()}
                  timestampEndEpoch={nowDayjs.unix()}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
