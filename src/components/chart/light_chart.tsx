import { Box } from "@mui/material"
import { type ChartProps, Line } from "react-chartjs-2"
import type { ChartOptions } from "@/lib/chartjs"

interface LightDataPoint {
  value: number
  timestamp: number
}

interface LightChartProps {
  lightData: LightDataPoint[]
}

export default function LightChart({ lightData }: LightChartProps) {
  const data: ChartProps<"line">["data"] = {
    labels: lightData.map((point) => point.timestamp),
    datasets: [
      {
        label: "Light",
        yAxisID: "light",
        data: lightData.map((point) => (point.value / 1023.0) * 100),
        fill: false,
        tension: 0,
      },
    ],
  }
  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            hour: "HH:mm",
          },
        },
        ticks: {
          maxTicksLimit: 20,
        },
      },
      light: {
        position: "left",
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  )
}
