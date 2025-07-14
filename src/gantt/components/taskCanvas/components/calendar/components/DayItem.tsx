import { useAtom } from "jotai"
import React, { useMemo } from "react"
import { canvasCellWidthAtom } from "../../../../../../shared/store/CanvasControlSore"

type DayItemProps = {
    dayNumber: number
    dayName: string
    isCurrentDay?: boolean
}

const DayItem: React.FC<DayItemProps> = ({ dayName, dayNumber, isCurrentDay = false }) => {
    const [cellWidth] = useAtom(canvasCellWidthAtom)
    
    return (
        <div className={ `min-w-[${cellWidth}px] flex flex-row gap-1 items-center ${ isCurrentDay && "bg-[#175af9] text-white" } px-2 rounded-full py text-sm` }>
            <span>{ dayName }</span>
            <span className="font-bold">{ dayNumber }</span>
        </div>
    )
}

export default React.memo(DayItem)
