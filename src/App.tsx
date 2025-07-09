import { useCallback, useState } from 'react'
import './App.css'
import Gantt from './gantt/Gantt'
import Toolbar from './shared/components/toolbar/Toolbar'
import TaskList from './gantt/TaskList'
import { Provider } from 'jotai'
import NewTaskModal from './shared/components/modals/newTaskModal/NewTaskModal'

const App = () => {
    const [ganttViewActive, setGanttViewActive] = useState(true)
    const [listViewActive, setListViewActive] = useState(false)
	const [newTaskModalVisible, setNewTaskModalVisible] = useState(false)

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
    
    return (
        <Provider>
            <div className="h-screen w-screen flex flex-col overflow-hidden">
                <Toolbar
                    onGantt={ handleGanttViewSwitch }
                    onList={ handleListViewSwitch }
					onNewTask={ onNewTask }
                />
                <div className="flex-1 overflow-hidden">
                    { ganttViewActive && <Gantt /> }
                    { listViewActive && <TaskList /> }
                </div>
            </div>
			<NewTaskModal
				open={ newTaskModalVisible }
				onClose={ onNewTaskModalClose }
			/>
        </Provider>
    )
}

export default App
