import { useCallback, useMemo, useState } from 'react'
import './App.css'
import Gantt from './gantt/Gantt'
import Toolbar from './shared/components/toolbar/Toolbar'
import TaskList from './gantt/TaskList'
import NewTaskModal from './shared/components/modals/newTaskModal/NewTaskModal'
import { useAtom } from 'jotai'
import FloatingAlert from './shared/components/alerts/floatingAlert/FloatingAlert'
import { AnimatePresence } from 'framer-motion'
import { selectedTasksAtom, tasksAtom } from './shared/store/Tasks'
import { createExcelFile } from './shared/utils/excel/ExcelFactory'
import ConfirmationModal from './shared/components/modals/confirmationModal/ConfirmationModal'

const App = () => {
    const [tasks, setTasks] = useAtom(tasksAtom)
    const [selectedTasks] = useAtom(selectedTasksAtom)
    const [ganttViewActive, setGanttViewActive] = useState(true)
    const [listViewActive, setListViewActive] = useState(false)
	const [newTaskModalVisible, setNewTaskModalVisible] = useState(false)
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)

    const handleListViewSwitch = useCallback(() => {
        setGanttViewActive(false)
        setListViewActive(true)
    }, [])

    const handleGanttViewSwitch = useCallback(() => {
        setGanttViewActive(true)
        setListViewActive(false)
    }, [])

	const onNewTask = useCallback(() => {
		setNewTaskModalVisible(true)
	}, [])

	const onNewTaskModalClose = useCallback(() => {
		setNewTaskModalVisible(false)
	}, [])

    const onDeleteTasks = useCallback(() => {
        // setTasks(prev => prev.filter(task => !selectedTasks.has(task.id)))

        setConfirmationModalVisible(true)
    }, [selectedTasks])

    const onConfirmationModalClose = useCallback(() => {
        setConfirmationModalVisible(false)
    }, [])

    const handleDeleteTasks = useCallback(() => {
        setTasks(prev => prev.filter(task => !selectedTasks.has(task.id)))
    }, [selectedTasks])

    const areTasksSelected = useMemo(() => {
        return selectedTasks.size > 0
    }, [selectedTasks])

    const onExport = useCallback(() => {
        let data = [...tasks]

        if (selectedTasks.size > 0) {
            data = tasks.filter(task => selectedTasks.has(task.id))
        }

        console.log('selectedTasks:', selectedTasks)
        
        createExcelFile(data, 'tasks_export')
    }, [tasks, selectedTasks])
    
    return (
        <>
            <div className="h-screen w-screen flex flex-col overflow-hidden">
                <Toolbar
                    onExport={ onExport }
                    onGantt={ handleGanttViewSwitch }
                    onList={ handleListViewSwitch }
                    onNewTask={ onNewTask }
                    onDelete={ onDeleteTasks }
                    hasSelectedTasks={ areTasksSelected }
                />
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode='wait'>
                        { ganttViewActive && <Gantt /> }
                        { listViewActive && <TaskList /> }
                    </AnimatePresence>
                </div>
            </div>
            <NewTaskModal
                open={ newTaskModalVisible }
                onClose={ onNewTaskModalClose }
            />
            <ConfirmationModal
                isOpen={ confirmationModalVisible } // Placeholder, implement logic to control visibility
                title="Confirm Action"
                message="Are you sure you want to delete the selected tasks?"
                confirmText='Delete'
                onConfirm={ handleDeleteTasks }
                onCancel={ onConfirmationModalClose }
            />
            <FloatingAlert />
        </>
    )
}

export default App
