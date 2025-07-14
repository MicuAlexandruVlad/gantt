import React, { memo } from "react"
import Calendar from "./components/calendar/Calendar"

interface TaskCanvasProps {

}

const TaskCanvas: React.FC<TaskCanvasProps> = () => {
    return (
        <div className="">
            <Calendar />
        </div>
    )
}

export default memo(TaskCanvas)
