import React, { memo } from "react"

type GanttProps = {}

const Gantt: React.FC<GanttProps> = ({}) => {

    return (
        <div className="w-full h-full flex flex-col">
            <span>Gantt View</span>
        </div>
    )
}

export default memo(Gantt)
