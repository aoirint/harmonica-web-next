import { Box } from "@mui/material"
import { type ChartProps, Line } from "react-chartjs-2"
import type { ChartOptions } from "@/lib/chartjs"

interface TrafficDataPoint {
  value: number
  timestamp: number
}

interface TrafficChartProps {
  trafficData: TrafficDataPoint[]
}

export default function TrafficChart({ trafficData }: TrafficChartProps) {
  const data: ChartProps<"line">["data"] = {
    labels: trafficData.map((point) => point.timestamp),
    datasets: [
      {
        label: "Traffic",
        yAxisID: "traffic",
        data: trafficData.map((point) => point.value / (1024 * 1024 * 1024)),
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
      traffic: {
        position: "left",
        suggestedMin: 0,
        suggestedMax: 20,
      },
    },
  }

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  )
}
