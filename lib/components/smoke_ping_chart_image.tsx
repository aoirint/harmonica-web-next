import { Box } from "@mui/material"
import dayjs from "dayjs"

interface SmokePingChartImageProps {
  smokePingUrl: string
  smokePingTarget: string
  timestampEpoch: number
}

export default function SmokePingChartImage({
  smokePingUrl,
  smokePingTarget,
  timestampEpoch
}: SmokePingChartImageProps) {
  const timestampDayjs = dayjs.unix(timestampEpoch).tz()
  const smokePingCgiStart = timestampDayjs.subtract(3, 'hour').format('YYYY-MM-DD HH:mm')
  const smokePingCgiEnd = timestampDayjs.format('YYYY-MM-DD HH:mm')
  const smokePingImageUrl = new URL('/smokeping/smokeping.cgi', smokePingUrl)
  smokePingImageUrl.search = `displaymode=a;start=${smokePingCgiStart};end=${smokePingCgiEnd};target=${smokePingTarget}`

  return (
    <Box>
      <img src={smokePingImageUrl.toString() ?? '#'} style={{
        width: '100%',
      }} />
    </Box>
  )
}