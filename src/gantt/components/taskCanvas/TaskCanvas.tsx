import React, { memo, useCallback } from "react"
import Calendar from "./components/calendar/Calendar"
import { useAtom, useAtomValue } from "jotai"
import { selectedTasksAtom, tasksAtom, updateTaskAtom } from "../../../shared/store/Tasks"
import TaskItem from "./components/taskItem/TaskItem"
import { DndContext, type DragEndEvent, type DragMoveEvent, type DragStartEvent } from "@dnd-kit/core"
import { canvasCellWidthAtom } from "../../../shared/store/CanvasControlSore"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import type Task from "../../../data/Task"

interface TaskCanvasProps {

}

const TaskCanvas: React.FC<TaskCanvasProps> = () => {
    const tasks = useAtomValue(tasksAtom)
    const selectedTasks = useAtomValue(selectedTasksAtom)
    const cellWidth = useAtomValue(canvasCellWidthAtom)
    const [, updateTask] = useAtom(updateTaskAtom)

    return (
        <div className="col-span-3 w-fit flex flex-col relative">
            {/* Grid background */}
            <div 
                className="absolute mt-[64px] inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e5e5e5 1px, transparent 1px),
                    `,
                    backgroundSize: '50px 50px'
                }}
            />
            
            {/* Content */}
            <div className="relative z-10 outline-none">
                <Calendar />
                {
                    tasks.map((task) => (
                        <TaskItem key={ task.id } onTaskUpdate={ updateTask } selected={ selectedTasks.has(task.id) } task={ task } />
                    ))
                }
            </div>
        </div>
    )
}

export default memo(TaskCanvas  )
