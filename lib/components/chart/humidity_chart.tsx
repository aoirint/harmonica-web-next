import { Box } from "@mui/material";

import { Line, ChartProps } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'

interface HumidityDataPoint {
  value: number
  timestamp: number
}

interface HumidityChartProps {
  humidityData: HumidityDataPoint[]
}

export default function HumidityChart({
  humidityData
}: HumidityChartProps) {
  const data: ChartProps<"line">['data'] = {
    labels: humidityData.map((point) => point.timestamp),
    datasets: [
      {
        label: 'Humidity',
        yAxisID: 'humidity',
        data: humidityData.map((point) => point.value),
        fill: false,
        tension: 0
      }
    ]
  }
  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        ticks: {
          maxTicksLimit: 20
        }
      },
      humidity: {
        position: 'left',
        title: {
          display: true,
          text: 'Humidity / %'
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  }

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  )
}