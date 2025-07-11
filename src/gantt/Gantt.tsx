import React, { memo } from "react"
import { motion } from "framer-motion"

type GanttProps = {}

const Gantt: React.FC<GanttProps> = ({}) => {

    return (
        <motion.div
            className="w-full h-full flex flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.2 }}
        >
            <span>Gantt View</span>
        </motion.div>
    )
}

export default memo(Gantt)
