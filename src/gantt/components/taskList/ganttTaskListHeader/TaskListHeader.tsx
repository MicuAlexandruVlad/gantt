import React, { memo } from "react"
import Checkbox from "../../../../shared/components/checkbox/Checkbox"
import { useAtom } from "jotai"
import { allSelectedAtom } from "../../../../shared/store/Tasks"

type TaskListHeaderProps = {

}

const GanttTaskListHeader: React.FC<TaskListHeaderProps> = ({}) => {
    const [allSelected, setAllSelected] = useAtom(allSelectedAtom)
    
    return (
        <div className="gap-2 items-center grid grid-cols-[minmax(20px,20px)_minmax(80px,1fr)_minmax(80px,80px)_minmax(80px,80px)] top-0 sticky border-b-1 border-[#e5e5e5] bg-white p-3">
            <Checkbox
                checked={ allSelected }
                onChange={ setAllSelected }
            />
            <span className="pr-3">Title</span>
            <span>Duration</span>
            <span>Status</span>
        </div>
    )
}

export default memo(GanttTaskListHeader)
