import React, { memo, useCallback, useMemo } from "react"
import TaskListHeader from "./ganttTaskListHeader/TaskListHeader"
import { useAtom } from "jotai"
import { selectedTasksAtom, tasksAtom } from "../../../shared/store/Tasks"
import type Task from "../../../data/Task"
import Checkbox from "../../../shared/components/checkbox/Checkbox"
import ProgressDisplay from "../../../shared/components/progressDisplay/ProgressDisplay"
import { defaultRowHeight } from "../../../shared/store/CanvasControlSore"

interface TaskListProps {

}

const TaskList: React.FC<TaskListProps> = () => {
    const [tasks] = useAtom(tasksAtom)
    const [selectedTasks, setSelectedTasks] = useAtom(selectedTasksAtom)

    const handleItemSelect = useCallback((taskId: string) => {
        setSelectedTasks(prev => {
            const newSelected = new Set(prev)
            if (newSelected.has(taskId)) {
                newSelected.delete(taskId)
            } else {
                newSelected.add(taskId)
            }

            return newSelected
        })
    }, [])
    
    return (
        <div className="flex flex-col col-span-1 min-w-fit min-h-fit sticky left-0 top-0 z-50 border-r-1 border-[#e5e5e5]">
            <TaskListHeader />
            <div className="flex-1">
                {
                    tasks.map(task => (
                        <TaskListRow key={ task.id } selected={ selectedTasks.has(task.id) } onSelect={ handleItemSelect } task={ task } />
                    ))
                }
            </div>
        </div>
    )
}

const TaskListRow: React.FC<{
    task: Task
    selected: boolean
    onSelect: (taskId: string) => void
}> = memo(({ task, selected, onSelect }) => {

    const taskDuration = useMemo(() => {
        const duration = Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24))

        return `${duration} days`
    }, [task.start, task.end])

    const handleSelect = useCallback(() => {
        onSelect(task.id)
    }, [task.id])
    
    return (
        <div
            onClick={ handleSelect }
            style={{ height: defaultRowHeight }}
            className={ `gap-2 ${ selected ? "bg-[#f3f5fc]" : "bg-white" } grid items-center grid-cols-[minmax(20px,20px)_minmax(100px,1fr)_minmax(80px,80px)_minmax(80px,80px)] p-3 border-b border-[#e5e5e5] transition-colors hover:bg-[#f5f5f5] cursor-pointer select-none` }
        >
            <Checkbox
                checked={ selected }
                onChange={() => {}}
            />
            <span className="truncate" title={ task.name }>{ task.name }</span>
            <span className="">{ taskDuration }</span>
            
            <div className="flex flex-row items-center gap-2">
                <ProgressDisplay
                    progress={ task.progress }
                />
                <span className="">{ task.progress } %</span>
            </div>
        </div>
    )
})

export default memo(TaskList)
