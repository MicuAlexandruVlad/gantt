import { useAtomValue } from "jotai"
import React, { useEffect } from "react"
import { canvasCellWidthAtom } from "../../../../../../shared/store/CanvasControlSore"

type DayItemProps = {
    dayNumber: number
    dayName: string
    isCurrentDay?: boolean
}

const DayItem: React.FC<DayItemProps> = ({ dayName, dayNumber, isCurrentDay = false }) => {
    const cellWidth = useAtomValue(canvasCellWidthAtom)

    return (
        <div
            style={{ minWidth: cellWidth }}
            className={ `flex flex-row gap-1 items-center ${ isCurrentDay && "bg-[#175af9]" } px-2 rounded-full py text-sm` }>
            <span className={ `${ isCurrentDay ? "text-[#f8f8f8]" : "text-[#656771]" }` }>{ dayName }</span>
            <span className={ `${ isCurrentDay && "text-white" } font-bold` }>{ dayNumber }</span>
        </div>
    )
}

export default React.memo(DayItem)
