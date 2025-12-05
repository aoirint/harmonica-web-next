import { Box } from "@mui/material"
import dayjs from "dayjs"

interface SmokePingChartImageProps {
  smokePingUrl: string
  smokePingTarget: string
  timestampStartEpoch: number
  timestampEndEpoch: number
}

export default function SmokePingChartImage({
  smokePingUrl,
  smokePingTarget,
  timestampStartEpoch,
  timestampEndEpoch,
}: SmokePingChartImageProps) {
  const timestampStartDayjs = dayjs.unix(timestampStartEpoch).tz()
  const timestampEndDayjs = dayjs.unix(timestampEndEpoch).tz()
  const smokePingCgiStart = timestampStartDayjs.format("YYYY-MM-DD HH:mm")
  const smokePingCgiEnd = timestampEndDayjs.format("YYYY-MM-DD HH:mm")

  const smokePingImageUrl = new URL("/smokeping/smokeping.cgi", smokePingUrl)
  smokePingImageUrl.search = `displaymode=a;start=${smokePingCgiStart};end=${smokePingCgiEnd};target=${smokePingTarget}`

  return (
    <Box>
      <img
        src={smokePingImageUrl.toString() ?? "#"}
        style={{
          width: "100%",
        }}
      />
    </Box>
  )
}
