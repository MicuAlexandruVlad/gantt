import React, { memo, useMemo } from "react"
import DayItem from "./components/DayItem"
import { useAtom } from "jotai"
import { tasksAtom } from "../../../../../shared/store/Tasks"
import { getDateRange } from "../../../../../shared/utils/task/TaskUtils"

type CalendarProps = {

}

const Calendar: React.FC<CalendarProps> = () => {
    const [tasks] = useAtom(tasksAtom)

    const dayRange = useMemo(() => {
        const dayItemsJSX = []
        const { start, end } = getDateRange(tasks)
        let currentDate = new Date(start)
        
        while (currentDate < end) {
            dayItemsJSX.push(
                <DayItem
                    key={ currentDate.toISOString() }
                    dayNumber={ currentDate.getDate() }
                    dayName={ currentDate.toLocaleDateString("en-US", { weekday: "short" }).substring(0, 1) }
                    isCurrentDay={ currentDate.toDateString() === new Date().toDateString() }
                />
            )

            currentDate.setDate(currentDate.getDate() + 1)
        }
    
        console.log("Day items JSX:", dayItemsJSX)
        console.log('range:', { start, end })

        return dayItemsJSX
    }, [tasks])
    
    return (
        <div className="flex w-fit shadow-md bg-white sticky top-0 p-3 z-10">
        { dayRange }
        </div>
    )
}

export default memo(Calendar)
