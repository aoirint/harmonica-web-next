import dayjs from "dayjs"
import dayjsTimezone from "dayjs/plugin/timezone"
import dayjsUtc from "dayjs/plugin/utc"

// Setup dayjs
dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTimezone)

export default dayjs
