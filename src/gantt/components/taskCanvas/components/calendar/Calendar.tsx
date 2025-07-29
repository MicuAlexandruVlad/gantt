import React, { memo, useMemo } from "react"
import { useAtom, useAtomValue } from "jotai"
import { tasksAtom } from "../../../../../shared/store/Tasks"
import { getDateRange } from "../../../../../shared/utils/task/TaskUtils"
import MonthItem from "./components/MonthItem"
import { startingDateAtom } from "../../../../../shared/store/CanvasControlSore"

type CalendarProps = {

}

const Calendar: React.FC<CalendarProps> = () => {
    const tasks = useAtomValue(tasksAtom)
    const [, setStartingDate] = useAtom(startingDateAtom)

    const monthRangeJSX = useMemo(() => {
        const monthItemsJSX = []
        const { start, end } = getDateRange(tasks)

        setStartingDate(start)
        
        let currentDate = new Date(start)
        currentDate.setHours(0, 0, 0, 0) // reset time to midnight
        
        while (currentDate < end) {
            monthItemsJSX.push(
                <MonthItem
                    key={ currentDate.toISOString() }
                    start={ new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) }
                    end={ new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) }
                />
            )

            // increment to the next month
            currentDate.setMonth(currentDate.getMonth() + 1)
            currentDate.setDate(1) // reset to the first day of the month

        }
    
        console.log("Day items JSX:", monthItemsJSX)
        console.log('range:', { start, end })

        return monthItemsJSX
    }, [tasks])
    
    return (
        <div className="flex w-fit shadow-md bg-white sticky top-0 py-2 z-10">
        { monthRangeJSX }
        </div>
    )
}

export default memo(Calendar)
