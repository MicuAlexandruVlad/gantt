import React, { memo, useMemo, useRef, useEffect } from "react"
import type Task from "../../../../../data/Task"
import { canvasCellWidthAtom, defaultRowHeight, startingDateAtom } from "../../../../../shared/store/CanvasControlSore"
import { useAtomValue } from "jotai"

type TaskItemProps = {
    task: Task
    selected?: boolean
    onTaskUpdate: (updatedTask: Task) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, selected, onTaskUpdate }) => {
    const startingDate = useAtomValue(startingDateAtom)
    const cellWidth = useAtomValue(canvasCellWidthAtom)
    const taskBarRef = useRef<HTMLDivElement>(null)
    
    // Refs for drag state management
    const isDraggingRef = useRef(false)
    const startXRef = useRef(0)
    const initialTranslateXRef = useRef(0)
    const initialLeftRef = useRef(0)

    const taskWidth = useMemo(() => {
        const duration = Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24))
        return duration * cellWidth
    }, [task.start, task.end, cellWidth])

    const taskLeft = useMemo(() => {
        return ((task.start.getTime() - startingDate.getTime()) / (1000 * 60 * 60 * 24)) * cellWidth
    }, [task.start, startingDate, cellWidth])

    
    useEffect(() => {
        if (taskBarRef.current) {
            taskBarRef.current.style.transform = `translateX(0px)`
        }
    }, [taskLeft])
    
    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true
        startXRef.current = e.clientX

        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingRef.current && taskBarRef.current) {
                const deltaX = e.clientX - startXRef.current

                taskBarRef.current.style.transform = `translateX(${deltaX}px)`
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            const deltaX = e.clientX - startXRef.current
            const daysMoved = Math.floor(deltaX / cellWidth)

            console.log('days moved', daysMoved)

            const newStartDate = new Date(task.start)
            newStartDate.setDate(newStartDate.getDate() + daysMoved)

            const newEndDate = new Date(task.end)
            newEndDate.setDate(newEndDate.getDate() + daysMoved)

            onTaskUpdate({
                ...task,
                start: newStartDate,
                end: newEndDate
            })

            console.log(newStartDate, newEndDate)

            isDraggingRef.current = false
            startXRef.current = 0
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }

    return (
        <div
            id="task-item-body"
            style={{
                height: defaultRowHeight,
                backgroundColor: selected ? "#f3f5fc" : 'transparent',
            }}
            className="text-sm text-white flex relative items-center border-b-1 border-[#e5e5e577] hover:bg-[#f3f5fc] transition-colors duration-200"
        >
            <div
                ref={ taskBarRef }
                onMouseDown={ handleMouseDown }
                style={{
                    width: taskWidth,
                    position: "absolute",
                    left: taskLeft,
                    transform: "translateX(0px)",
                }}
                className="rounded-md p-2 bg-amber-500 flex items-center justify-center cursor-grab hover:bg-amber-600 transition-colors duration-200"
            >
                <span className="truncate">{task.name}</span>
            </div>
        </div>
    )
}

export default memo(TaskItem)