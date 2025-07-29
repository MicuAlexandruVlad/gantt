import React, { useMemo } from "react"
import DayItem from "./DayItem"

type MonthItemProps = {
    start: Date
    end: Date
}

const MonthItem: React.FC<MonthItemProps> = ({ start, end }) => {

    const fullMonthName = useMemo(() => {
        return start.toLocaleString('default', { month: 'long' })
    }, [start])

    const year = useMemo(() => {
        return start.getFullYear()
    }, [start])

    const dayItemsJSX = useMemo(() => {
        const days = []
        let currentDate = new Date(start)
        currentDate.setHours(0, 0, 0, 0) // reset time to midnight

        while (currentDate <= end) {
            days.push(
                <DayItem
                    key={ currentDate.toISOString() }
                    dayNumber={ currentDate.getDate() }
                    dayName={ currentDate.toLocaleDateString("en-US", { weekday: "short" }).substring(0, 1) }
                    isCurrentDay={ currentDate.toDateString() === new Date().toDateString() }
                />
            )
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return days
    }, [start, end])

    return (
        <div className="flex flex-col gap-2 border-r-1 border-[#e5e5e5]">
            <span className="text-sm pl-2 text-[#656771] truncate">{ fullMonthName }, { year }</span>
            <div className="flex flex-row">{ dayItemsJSX }</div>
        </div>
    )
}

export default React.memo(MonthItem)
