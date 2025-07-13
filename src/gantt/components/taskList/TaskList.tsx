import React, { memo } from "react"
import TaskListHeader from "./ganttTaskListHeader/TaskListHeader"

interface TaskListProps {

}

const TaskList: React.FC<TaskListProps> = () => {
    return (
        <div>
            <TaskListHeader />
        </div>
    )
}

export default memo(TaskList)
