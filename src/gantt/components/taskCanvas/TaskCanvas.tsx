import React, { memo } from "react"
import Calendar from "./components/calendar/Calendar"

interface TaskCanvasProps {

}

const TaskCanvas: React.FC<TaskCanvasProps> = () => {
    return (
        <div className="col-span-3">
            <Calendar />
        </div>
    )
}

export default memo(TaskCanvas)
