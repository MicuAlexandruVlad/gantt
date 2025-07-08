import React, { memo, useCallback } from "react"
import ViewSwitchButton from "./components/viewSwitchButton/ViewSwitchButton"

interface ToolbarProps {

}

const Toolbar: React.FC<ToolbarProps> = () => {

    const handleGanttViewSwitch = useCallback(() => {
        // Logic to switch to Gantt view
        console.log("Switching to Gantt view")
    }, [])

    const handleListViewSwitch = useCallback(() => {
        // Logic to switch to List view
        console.log("Switching to List view")
    }, [])
    
    return (
        <div className="flex row items-center p-2">
            <ViewSwitchButton 
                icon={ ganttIcon }
                onClick={ handleGanttViewSwitch }
            />
            <ViewSwitchButton 
                icon={ listIcon }
                onClick={ handleListViewSwitch }
            />
        </div>
    )
}

const ganttIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 17C19 18.1046 18.1168 19 17.0274 19L2.9726 19C1.88316 19 1 18.1046 1 17L1 14C1 12.8954 1.88316 12 2.9726 12L17.0274 12C18.1168 12 19 12.8954 19 14V17Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 3C19 1.89543 18.1168 1 17.0274 1L2.9726 1C1.88316 1 1 1.89543 1 3L1 6C1 7.10457 1.88316 8 2.9726 8H17.0274C18.1168 8 19 7.10457 19 6V3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const listIcon = (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9999 1.99999L10.9999 20M1.3999 11H19.9999M1.3999 4.99999L1.3999 17C1.3999 18.9882 3.01168 20.6 4.9999 20.6H16.9999C18.9881 20.6 20.5999 18.9882 20.5999 17V4.99999C20.5999 3.01177 18.9881 1.39999 16.9999 1.39999L4.9999 1.39999C3.01168 1.39999 1.3999 3.01177 1.3999 4.99999Z" stroke="black" strokeWidth="2"/>
    </svg>
)

export default memo(Toolbar)
