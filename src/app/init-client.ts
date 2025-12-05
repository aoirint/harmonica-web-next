"use client"

import {
  Chart,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js"
import dayjs from "dayjs"
import dayjsTimezone from "dayjs/plugin/timezone"
import dayjsUtc from "dayjs/plugin/utc"
import "chartjs-adapter-luxon"

// Setup dayjs
dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTimezone)

// Setup Chart.js
Chart.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Colors,
)

// Dark color
Chart.defaults.borderColor = "#444c56"
Chart.defaults.color = "#adbac7"
