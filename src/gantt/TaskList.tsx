import React from "react"

type TaskListProps = {}

const TaskList: React.FC<TaskListProps> = ({}) => {
    return (
        <div className="w-full h-full flex flex-col">
            <span>Task List View</span>
        </div>
    )
}

export default TaskList
