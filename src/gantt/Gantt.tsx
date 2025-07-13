import React, { memo } from "react"
import { motion } from "framer-motion"
import TaskList from "./components/taskList/TaskList"
import TaskCanvas from "./components/taskCanvas/TaskCanvas"

type GanttProps = {}

const Gantt: React.FC<GanttProps> = ({}) => {

    return (
        <motion.div
            className="w-full h-full flex flex-row select-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2 }}
        >
            <TaskList />
            <TaskCanvas />
        </motion.div>
    )
}

export default memo(Gantt)
