import React, { memo } from "react"
import Calendar from "./components/calendar/Calendar"
import { useAtom, useAtomValue } from "jotai"
import { tasksAtom } from "../../../shared/store/Tasks"

interface TaskCanvasProps {

}

const TaskCanvas: React.FC<TaskCanvasProps> = () => {
    const tasks = useAtomValue(tasksAtom)
    
    return (
        <div className="col-span-3 flex flex-col">
            <Calendar />
        </div>
    )
}

export default memo(TaskCanvas)
