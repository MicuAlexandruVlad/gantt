import React, { memo, useCallback } from "react"
import ReactModal from "react-modal"
import SimpleButton from "../../buttons/simpleButton/SimpleButton"

type ConfirmationModalProps = {
    isOpen: boolean
    title: string
    message: string
    primaryColor?: string
    secondaryColor?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen, title, message, primaryColor = "#175af9", secondaryColor = "", confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel
}) => {

    const handleClose = useCallback(() => {
        onCancel()
    }, [])

    const handleConfirm = useCallback(() => {
        onConfirm()
        handleClose()
    }, [onConfirm])

    return (
        <ReactModal
            isOpen={ isOpen }
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
                    userSelect: 'none',
                    zIndex: 1000,
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }
            }}
        >
            <div className="flex max-h-[80vh] overflow-y-auto flex-col p-2 min-w-[500px] bg-white rounded-md">
                {/* Header */}
                <span className="text-xl font-bold">{ title }</span>
                <div
                    onClick={ handleClose }
                    className="cursor-pointer absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                    { closeIcon }
                </div>

                <span className="mt-4 text-md">{ message }</span>

                <div className="flex flex-row items-center mt-8 gap-2 self-end">
                    <SimpleButton
                        text={ cancelText }
                        useSecondary
                        onClick={ handleClose }
                    />
                    <SimpleButton
                        text={ confirmText }
                        onClick={ handleConfirm }
                    />
                </div>
            </div>
        </ReactModal>
    )
}

const closeIcon = (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1L1 9M9 9L1 0.999998" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
)


export default memo(ConfirmationModal)
