import React, { memo, useCallback } from "react"
import Modal from 'react-modal'
import TextInput from "../../inputs/textInput/TextInput"
import LargeTextInput from "../../inputs/largeTextInput/LargeTextInput"

type NewTaskModalProps = {
    open: boolean
    onClose: () => void
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ open, onClose }) => {
    const [taskName, setTaskName] = React.useState("")
    const [description, setDescription] = React.useState("")
    
    const handleClose = useCallback(() => {
        setTimeout(() => {
            // clear modal data
            setTaskName("")
            setDescription("")
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
                    // width: '400px',
                    // height: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    userSelect: 'none',
                    zIndex: 1000,
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }
            }}
        >
            <div className="flex max-h-[60vh] overflow-y-auto flex-col p-2 min-w-[500px] bg-white rounded-md">
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
