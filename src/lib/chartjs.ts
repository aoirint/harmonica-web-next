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

export default Chart
