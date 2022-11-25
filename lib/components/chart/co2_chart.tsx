import { Box } from "@mui/material";

import { Line, ChartProps } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'

interface Co2DataPoint {
  value: number
  timestamp: number
}

interface Co2ChartProps {
  co2Data: Co2DataPoint[]
}

export default function Co2Chart({
  co2Data
}: Co2ChartProps) {
  const data: ChartProps<"line">['data'] = {
    labels: co2Data.map((point) => point.timestamp),
    datasets: [
      {
        label: 'CO2',
        yAxisID: 'co2',
        data: co2Data.map((point) => point.value),
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
      co2: {
        position: 'left',
        title: {
          display: true,
          text: 'CO2'
        },
        suggestedMin: 200,
        suggestedMax: 1400
      }
    }
  }

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  )
}