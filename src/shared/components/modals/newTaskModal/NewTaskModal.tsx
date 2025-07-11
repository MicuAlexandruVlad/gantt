import React, { memo, useCallback } from "react"
import Modal from 'react-modal'
import TextInput from "../../inputs/textInput/TextInput"
import LargeTextInput from "../../inputs/largeTextInput/LargeTextInput"
import DatePickerInput from "../../inputs/datePickerInput/DatePickerInput"
import SimpleButton from "../../buttons/simpleButton/SimpleButton"
import type Task from "../../../../data/Task"
import { useAtom } from "jotai"
import { tasksAtom } from "../../../store/Tasks"
import { useNewTaskForm } from "../../../store/TaskCreationStore"

type NewTaskModalProps = {
    open: boolean
    onClose: () => void
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ open, onClose }) => {
    const [, setTasks] = useAtom(tasksAtom)
    const newTaskForm = useNewTaskForm()
    
    const [taskName, setTaskName] = newTaskForm.useTaskName()
    const [description, setDescription] = newTaskForm.useDescription()
    const [startDate, setStartDate] = newTaskForm.useStartDate()
    const [dueDate, setDueDate] = newTaskForm.useDueDate()
    
    const handleSave = () => {
        const task: Task = {
            id: Math.random().toString(36).substring(2, 15), // simple random ID
            name: taskName,
            description: description,
            start: startDate ? startDate : new Date(),
            end: dueDate ? dueDate : new Date(),
            assignedTo: [],
            priority: 'medium',
            progress: 0,
        }

        console.log("New Task Created:", task)

        setTasks(prev => [...prev, task])

        handleClose()
    }

    const handleClose = useCallback(() => {
        setTimeout(() => {
            // clear modal data
            newTaskForm.resetForm()
        }, 100)
        onClose()
    }, [])
    
    return (
        <Modal
            isOpen={ open }
            onRequestClose={ handleClose }
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    userSelect: 'none'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                }
            }}
        >
            <div className="flex max-h-[80vh] overflow-y-auto flex-col p-2 min-w-[500px] bg-white rounded-md">
                {/* Header */}
                <span className="text-xl font-bold">Create New Task</span>
                <div
                    onClick={ handleClose }
                    className="cursor-pointer absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                    { closeIcon }
                </div>

                {/* Content */}
                <div className="flex flex-col mt-10 gap-4">
                    <TextInput
                        label="Task Name"
                        value={ taskName }
                        placeholder="Enter task name"
                        onChange={ setTaskName }
                    />
                    <LargeTextInput
                        label="Description"
                        value={ description }
                        placeholder="Enter task description"
                        onChange={ setDescription }
                    />
                    <DatePickerInput
                        value={ startDate }
                        label="Start Date"
                        placeholder="Select start date"
                        onChange={ setStartDate }
                    />
                    <DatePickerInput
                        value={ dueDate }
                        label="Due Date"
                        placeholder="Select due date"
                        onChange={ setDueDate }
                    />
                </div>
                <div className="flex flex-row items-center mt-8 gap-2 self-end">
                    <SimpleButton
                        text="Cancel"
                        useSecondary
                        onClick={ handleClose }
                    />
                    <SimpleButton
                        text="Create"
                        onClick={ handleSave }
                    />
                </div>
            </div>
        </Modal>
    )
}

const closeIcon = (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9M9 9L1 0.999998" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
)

export default memo(NewTaskModal)
