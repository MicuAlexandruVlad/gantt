import React, { memo } from "react"

interface TaskCanvasProps {

}

const TaskCanvas: React.FC<TaskCanvasProps> = () => {
    return (
        <div className="">
            <span>Task Canvas</span>
        </div>
    )
}

export default memo(TaskCanvas)
