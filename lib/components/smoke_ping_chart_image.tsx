import { Box } from "@mui/material"
import dayjs from "dayjs"

interface SmokePingChartImageProps {
  timestampEpoch: number
}

export default function SmokePingChartImage({
  timestampEpoch
}: SmokePingChartImageProps) {
  const smokePingUrl = process.env.NEXT_PUBLIC_SMOKEPING_URL
  const smokePingTarget = process.env.NEXT_PUBLIC_SMOKEPING_TARGET

  if (smokePingUrl === undefined || smokePingTarget === undefined) {
    return (
      <Box>
        SmokePing info undefined
      </Box>
    )
  }

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