import { useAtom } from "jotai"
import React from "react"
import { tasksAtom } from "../shared/store/Tasks"
import type Task from "../data/Task"

type TaskListProps = {}

const TaskList: React.FC<TaskListProps> = ({}) => {
    const [tasks, setTasks] = useAtom(tasksAtom)

    console.log('TaskList rendered')

    return (
        <div className="w-full h-full flex flex-col">
            <div className="overflow-x-auto">
                <div className="bg-[#f7f8fa] py-4 text-[#656771] shadow grid grid-cols-[minmax(200px,1fr)_minmax(120px,150px)_minmax(120px,150px)_minmax(100px,120px)_minmax(100px,150px)_minmax(100px,120px)_minmax(80px,120px)_minmax(120px,120px)_minmax(80px,120px)] gap-2 p-2">
                    <span>Title</span>
                    <span>Start Date</span>
                    <span>End Date</span>
                    <span>Progress</span>
                    <span>Assignees</span>
                    <span>Status</span>
                    <span>Description</span>
                    <span>Completed</span>
                    <span>Priority</span>
                </div>
                {
                    tasks.map((task) => <ListRow key={ task.id } task={ task } />)
                }
            </div>
        </div>
    )
}

const ListRow: React.FC<{ task: Task, selected?: boolean }> = ({ task, selected }) => {
    return (
        <div className={`${ selected && "bg-[#fcf4f3]" } py-4 border-b border-[#e9e9e9] grid grid-cols-[minmax(200px,1fr)_minmax(120px,150px)_minmax(120px,150px)_minmax(100px,120px)_minmax(100px,150px)_minmax(100px,120px)_minmax(80px,120px)_minmax(120px,120px)_minmax(80px,120px)] gap-2 px-2`}>
            <h3 className="min-w-0 truncate">{ task.name }</h3>
            <p className="min-w-0 truncate">{ task.start.toLocaleDateString() }</p>
            <p className="min-w-0 truncate">{ task.end.toLocaleDateString() }</p>
            <p className="min-w-0 truncate">{ task.progress } %</p>
            <p className="min-w-0 truncate">{ task.assignedTo.length ? task.assignedTo.map(a => a.name).join(',') : 'No Assignees' }</p>
            <p className="min-w-0 truncate">{ task.isActive ? 'Active' : 'Inactive' }</p>
            <p className="min-w-0 truncate">{ task.description || 'No description' }</p>
            <p className="min-w-0 truncate">{ task.completed ? 'Completed' : 'Not completed' }</p>
            <p className="min-w-0 truncate">{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }</p>
        </div>
    )
}

export default TaskList
