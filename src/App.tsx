import { useCallback, useState } from 'react'
import './App.css'
import Gantt from './gantt/Gantt'
import Toolbar from './shared/components/toolbar/Toolbar'
import TaskList from './gantt/TaskList'
import { Provider } from 'jotai'

const App = () => {
	const [ganttViewActive, setGanttViewActive] = useState(true)
	const [listViewActive, setListViewActive] = useState(false)


	const handleListViewSwitch = useCallback(() => {
		setGanttViewActive(false)
		setListViewActive(true)
	}, [])

	const handleGanttViewSwitch = useCallback(() => {
		setGanttViewActive(true)
		setListViewActive(false)
	}, [])
	
	return (
		<Provider>
			<div>
				<Toolbar
					onGantt={ handleGanttViewSwitch }
					onList={ handleListViewSwitch }
				/>
				<div>
					{ ganttViewActive && <Gantt /> }
					{ listViewActive && <TaskList /> }
				</div>
			</div>
		</Provider>
	)
}

export default App
