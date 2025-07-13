import React, { memo } from "react"

type TaskListHeaderProps = {

}

const GanttTaskListHeader: React.FC<TaskListHeaderProps> = ({}) => {
    return (
        <div>
            <span>Task List Header</span>
        </div>
    )
}

export default memo(GanttTaskListHeader)
