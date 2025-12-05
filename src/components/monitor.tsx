"use client"

import assert from "node:assert"
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import MainAppBar from "@/components/app_bar/main_app_bar"
import Co2Chart from "@/components/chart/co2_chart"
import HumidityChart from "@/components/chart/humidity_chart"
import LightChart from "@/components/chart/light_chart"
import TemperatureChart from "@/components/chart/temperature_chart"
import SmokePingChartImage from "@/components/smoke_ping_chart_image"
import dayjs from "@/lib/dayjs"
import { useGetMonitorQuery } from "@/lib/graphql-types"
import { useAuthRedirect } from "./auth-redirect"

export default function Monitor() {
  useAuthRedirect()

  const smokePingNames =
    process.env.NEXT_PUBLIC_SMOKEPING_NAMES?.split(",") ?? []
  const smokePingUrls = process.env.NEXT_PUBLIC_SMOKEPING_URLS?.split(",") ?? []
  const smokePingTargets =
    process.env.NEXT_PUBLIC_SMOKEPING_TARGETS?.split(",") ?? []
  assert(smokePingUrls.length === smokePingTargets.length)

  const smokePingEntries = Array.from(Array(smokePingUrls.length).keys()).map(
    (index) => ({
      name: smokePingNames[index],
      url: smokePingUrls[index],
      target: smokePingTargets[index],
    }),
  )

  const temperatureOffsetString =
    process.env.NEXT_PUBLIC_TEMPERATURE_OFFSET ?? "0.0"
  const temperatureOffset = parseFloat(temperatureOffsetString)

  const humidityOffsetString = process.env.NEXT_PUBLIC_HUMIDITY_OFFSET ?? "0.0"
  const humidityOffset = parseFloat(humidityOffsetString)

  const [currentTimestamp, setCurrentTimestamp] = useState(dayjs().unix())
  const [durationSeconds, setDurationSeconds] = useState(6 * 3600)

  const nowDayjs = dayjs.unix(currentTimestamp).tz()
  const startDayjs = nowDayjs.subtract(durationSeconds, "second")
  const weekAgoDayjs = nowDayjs.subtract(1, "week")

  const { data } = useGetMonitorQuery({
    variables: {
      timestampComp: {
        _gte: startDayjs.format(),
        _lt: nowDayjs.format(),
      },
      timestampWeekComp: {
        _gte: weekAgoDayjs.format(),
        _lt: nowDayjs.format(),
      },
    },
    fetchPolicy: "no-cache",
  })

  const minimumCo2ValueInWeek =
    data?.mhz19Co2Aggregate?.aggregate?.min?.value ?? 0

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
  const lastLightValue =
    lightDataCount > 0
      ? calibratedData?.light?.[lightDataCount - 1]?.value
      : undefined

  const temperatureDataCount = calibratedData?.temperature?.length ?? 0
  const lastTemperatureValue =
    temperatureDataCount > 0
      ? calibratedData?.temperature?.[temperatureDataCount - 1]?.value
      : undefined

  const humidityDataCount = calibratedData?.humidity?.length ?? 0
  const lastHumidityValue =
    humidityDataCount > 0
      ? calibratedData?.humidity?.[humidityDataCount - 1]?.value
      : undefined

  const co2DataCount = calibratedData?.mhz19Co2?.length ?? 0
  const lastCo2Value =
    co2DataCount > 0
      ? calibratedData?.mhz19Co2?.[co2DataCount - 1]?.value
      : undefined

  // Refresh data every 1 minute
  // Reload page every 60 minutes
  useEffect(() => {
    const refreshIntervalId = setInterval(() => {
      setCurrentTimestamp(dayjs().unix())
    }, 60 * 1000)

    const reloadIntervalId = setInterval(
      () => {
        location.reload()
      },
      60 * 60 * 1000,
    )

    return () => {
      clearInterval(refreshIntervalId)
      clearInterval(reloadIntervalId)
    }
  })

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MainAppBar
          onDurationChanged={(duration) => {
            setDurationSeconds(duration)
          }}
        />
        {/* <MainDrawer /> */}
        <Container
          component="main"
          maxWidth={false}
          sx={{ mt: 3, flexGrow: 1 }}
        >
          <Toolbar />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                Light / {lastLightValue?.toFixed(0)} %
              </Typography>
              <LightChart lightData={calibratedData?.light ?? []} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                Humidity / {lastHumidityValue?.toFixed(0)} %
              </Typography>
              <HumidityChart humidityData={calibratedData?.humidity ?? []} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                Temperature / {lastTemperatureValue?.toFixed(1)} ℃
              </Typography>
              <TemperatureChart
                temperatureData={calibratedData?.temperature ?? []}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                CO2 / {lastCo2Value?.toFixed(0)} ppm
              </Typography>
              <Co2Chart co2Data={calibratedData?.mhz19Co2 ?? []} />
            </Grid>
            {/* <Grid size={{xs: 12, md: 4}}>
              <Typography variant="h6" component="h2" sx={{ mb: 1 }}>Traffic / GiB</Typography>
              <TrafficChart trafficData={calibratedData?.l12TrafficDaily ?? []} />
            </Grid> */}
            {smokePingEntries.map((smokePing) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={`${smokePing.name}-${smokePing.url}-${smokePing.target}`}
              >
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  {smokePing.name}
                </Typography>
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
