import { Box } from "@mui/material";

import { Line, ChartProps } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'

interface TemperatureDataPoint {
  value: number
  timestamp: number
}

interface TemperatureChartProps {
  temperatureData: TemperatureDataPoint[]
}

export default function TemperatureChart({
  temperatureData
}: TemperatureChartProps) {
  const data: ChartProps<"line">['data'] = {
    labels: temperatureData.map((point) => point.timestamp),
    datasets: [
      {
        label: 'Temperature',
        yAxisID: 'temperature',
        data: temperatureData.map((point) => point.value),
        fill: false,
        tension: 0
      }
    ]
  }
  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        display: false
      }
    },
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
      temperature: {
        position: 'left',
        suggestedMin: 0,
        suggestedMax: 40
      }
    }
  }

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  )
}