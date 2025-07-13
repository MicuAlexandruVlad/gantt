import { useAtom } from "jotai"
import React, { memo, useCallback } from "react"
import { allSelectedAtom, selectedTasksAtom, tasksAtom } from "../shared/store/Tasks"
import type Task from "../data/Task"
import Checkbox from "../shared/components/checkbox/Checkbox"
import { motion } from "framer-motion"

type TaskListProps = {}

const LargeTaskList: React.FC<TaskListProps> = ({}) => {
    const [tasks, _] = useAtom(tasksAtom)
    const [selectedTasks, setSelectedTasks] = useAtom(selectedTasksAtom)
    const [allSelected, toggleAllSelected] = useAtom(allSelectedAtom)

    const handleSelectAll = useCallback(() => {
        toggleAllSelected()
    }, [])

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
        <div className="w-full h-full flex flex-col overflow-hidden select-none">
            {/* Single scrollable container for both header and content */}
            <div className="flex-1 overflow-auto">
                {/* Sticky header */}
                <div className="sticky min-w-fit top-0 z-1 bg-[#f7f8fa] py-4 text-[#656771] shadow grid grid-cols-[minmax(20px,20px)_minmax(200px,1fr)_minmax(120px,150px)_minmax(120px,150px)_minmax(100px,120px)_minmax(100px,150px)_minmax(100px,120px)_minmax(80px,120px)_minmax(120px,120px)_minmax(80px,120px)] gap-2 p-2">
                    <div className="mt-auto mb-auto">
                        <Checkbox
                            checked={ allSelected }
                            onChange={ handleSelectAll }
                        />
                    </div>
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
                    tasks.map((task) =>
                        <ListRow
                            onSelect={ handleItemSelect }
                            selected={ selectedTasks.has(task.id) }
                            key={ task.id }
                            task={ task }
                        />
                    )
                }
            </div>
        </div>
    )
}

const ListRow: React.FC<{
    task: Task, selected: boolean, onSelect: (taskId: string) => void
}> = memo(({ task, selected, onSelect }) => {
    const handleSelection = useCallback(() => {
        onSelect(task.id)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${ selected && "bg-[#f3f5fc]" } py-4 border-b border-[#e9e9e9] grid grid-cols-[minmax(20px,20px)_minmax(200px,1fr)_minmax(120px,150px)_minmax(120px,150px)_minmax(100px,120px)_minmax(100px,150px)_minmax(100px,120px)_minmax(80px,120px)_minmax(120px,120px)_minmax(80px,120px)] gap-2 px-2`}>
            <div className="mt-auto mb-auto">
                <Checkbox
                    checked={ selected }
                    onChange={ handleSelection }
                />
            </div>
            <p className="truncate">{ task.name }</p>
            <p className="truncate">{ task.start.toLocaleDateString() }</p>
            <p className="truncate">{ task.end.toLocaleDateString() }</p>
            <p className="truncate">{ task.progress } %</p>
            <p className="truncate">{ task.assignedTo.length ? task.assignedTo.map(a => a.name).join(',') : 'No Assignees' }</p>
            <p className="truncate">{ task.isActive ? 'Active' : 'Inactive' }</p>
            <p className="truncate">{ task.description || 'No description' }</p>
            <p className="truncate">{ task.completed ? 'Completed' : 'Not completed' }</p>
            <p className="truncate">{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }</p>
        </motion.div>
    )
}, (prev, next) => {
    return prev.selected === next.selected && JSON.stringify(prev.task) === JSON.stringify(next.task)
})

export default memo(LargeTaskList)
