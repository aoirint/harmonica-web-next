import { Box } from "@mui/material"
import Image from "next/image"
import dayjs from "@/lib/dayjs"

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
      <Image
        src={smokePingImageUrl.toString() ?? "#"}
        alt="SmokePing Chart"
        width={697}
        height={310}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  )
}
