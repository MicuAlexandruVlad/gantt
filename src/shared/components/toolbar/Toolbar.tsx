import React, { memo, useCallback, useMemo } from "react"
import ViewSwitchButton from "./components/viewSwitchButton/ViewSwitchButton"
import ToolbarButton from "./components/toolbarButton/ToolbarButton"

interface ToolbarProps {
    onGantt: () => void
    onList: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onGantt, onList }) => {
    const [ganttViewActive, setGanttViewActive] = React.useState(true)
    const [listViewActive, setListViewActive] = React.useState(false)

    const handleGanttViewSwitch = useCallback(() => {
        // Logic to switch to Gantt view
        onGantt()
        setGanttViewActive(true)
        setListViewActive(false)
    }, [])

    const handleListViewSwitch = useCallback(() => {
        // Logic to switch to List view
        onList()
        setGanttViewActive(false)
        setListViewActive(true)
    }, [])

    const handleFilter = useCallback(() => {}, [])

    const handleZoomIn = useCallback(() => {}, [])

    const handleZoomOut = useCallback(() => {}, [])

    const handleExport = useCallback(() => {}, [])

    const handleShare = useCallback(() => {}, [])

    const handleMenu = useCallback(() => {}, [])

    const listIcon = useMemo(() => {
        return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9999 1.99999L10.9999 20M1.3999 11H19.9999M1.3999 4.99999L1.3999 17C1.3999 18.9882 3.01168 20.6 4.9999 20.6H16.9999C18.9881 20.6 20.5999 18.9882 20.5999 17V4.99999C20.5999 3.01177 18.9881 1.39999 16.9999 1.39999L4.9999 1.39999C3.01168 1.39999 1.3999 3.01177 1.3999 4.99999Z" stroke={ listViewActive ? '#175af9' : '#616163' } strokeWidth="2"/>
            </svg>
        )
    }, [listViewActive])

    const ganttIcon = useMemo(() => {
        return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C12 1.89543 11.1168 1 10.0274 1L2.9726 1C1.88316 1 1 1.89543 1 3L1 6C1 7.10457 1.88316 8 2.9726 8H10.0274C11.1168 8 12 7.10457 12 6V3Z" stroke={ ganttViewActive ? '#175af9' : '#616163' } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 17C19 18.1046 18.1168 19 17.0274 19L2.9726 19C1.88316 19 1 18.1046 1 17L1 14C1 12.8954 1.88316 12 2.9726 12L17.0274 12C18.1168 12 19 12.8954 19 14V17Z" stroke={ ganttViewActive ? '#175af9' : '#616163' } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }, [ganttViewActive])

    const separator = useMemo(() => {
        return <div className="w-[1px] bg-[#e5e5e5] h-[30px] mx-2" />
    }, [])
    
    return (
        <div className="flex flex-row items-center py-2 px-4 border-1 mt-1 border-[#e5e5e5]">
            <div className="flex flex-row items-center gap-4">
                <ViewSwitchButton
                    active={ ganttViewActive }
                    buttonText="Gantt"
                    icon={ ganttIcon }
                    onClick={ handleGanttViewSwitch }
                />
                { separator }
                <ViewSwitchButton
                    active={ listViewActive }
                    buttonText="List"
                    icon={ listIcon }
                    onClick={ handleListViewSwitch }
                />
            </div>
            <div className="flex-1" />
            <ToolbarButton
                usePrimary
                useRound
                icon={
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99995 1.2002L5.99995 10.8002M10.8 6.00019L1.19995 6.0002" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                }
                onClick={ () => {} }
            />
            { separator }
            <ToolbarButton
                text="Filter"
                icon={
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.46154 6H14.5385M1 1H17M7.15385 11H10.8462" stroke="#121416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
                onClick={ handleFilter }
            />
            { separator }
            <ToolbarButton
                icon={
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7575 13.8087C15.3606 13.4247 14.7275 13.4352 14.3435 13.8321C13.9595 14.229 13.97 14.8621 14.3669 15.2461L15.7575 13.8087ZM17.84 18.6061C18.237 18.9901 18.8701 18.9796 19.2541 18.5827C19.6381 18.1858 19.6276 17.5527 19.2307 17.1687L17.84 18.6061ZM8.53535 11.8874C8.53535 12.4397 8.98307 12.8874 9.53535 12.8874C10.0876 12.8874 10.5354 12.4397 10.5354 11.8874H8.53535ZM10.5354 5.8874C10.5354 5.33512 10.0876 4.8874 9.53535 4.8874C8.98307 4.8874 8.53535 5.33512 8.53535 5.8874H10.5354ZM6.53535 7.8874C5.98307 7.8874 5.53535 8.33512 5.53535 8.8874C5.53535 9.43969 5.98307 9.8874 6.53535 9.8874V7.8874ZM12.5354 9.8874C13.0876 9.8874 13.5354 9.43969 13.5354 8.8874C13.5354 8.33512 13.0876 7.8874 12.5354 7.8874V9.8874ZM16.4154 8.9274C16.4154 12.705 13.353 15.7674 9.57535 15.7674V17.7674C14.4575 17.7674 18.4154 13.8096 18.4154 8.9274H16.4154ZM9.57535 15.7674C5.79772 15.7674 2.73535 12.705 2.73535 8.9274H0.735352C0.735352 13.8096 4.69315 17.7674 9.57535 17.7674V15.7674ZM2.73535 8.9274C2.73535 5.14977 5.79772 2.0874 9.57535 2.0874V0.0874023C4.69315 0.0874023 0.735352 4.04521 0.735352 8.9274H2.73535ZM9.57535 2.0874C13.353 2.0874 16.4154 5.14977 16.4154 8.9274H18.4154C18.4154 4.04521 14.4575 0.0874023 9.57535 0.0874023V2.0874ZM14.3669 15.2461L17.84 18.6061L19.2307 17.1687L15.7575 13.8087L14.3669 15.2461ZM10.5354 11.8874V8.8874H8.53535V11.8874H10.5354ZM10.5354 8.8874V5.8874H8.53535V8.8874H10.5354ZM6.53535 9.8874H9.53535V7.8874H6.53535V9.8874ZM9.53535 9.8874H12.5354V7.8874H9.53535V9.8874Z" fill="#121416"/>
                    </svg>
                }
                onClick={ handleZoomIn }
            />
            <div className="mx-1" />
            <ToolbarButton
                icon={
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0622 14.5274L18.5354 17.8874M6.53535 8.8874H12.5354M17.4154 8.9274C17.4154 13.2573 13.9053 16.7674 9.57535 16.7674C5.24544 16.7674 1.73535 13.2573 1.73535 8.9274C1.73535 4.59749 5.24544 1.0874 9.57535 1.0874C13.9053 1.0874 17.4154 4.59749 17.4154 8.9274Z" stroke="#121416" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                }
                onClick={ handleZoomOut }
            />
            { separator }
            <ToolbarButton
                text="Export"
                icon={
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.6001 14.2197V17.9256C1.6001 18.4873 1.82135 19.0259 2.21517 19.423C2.609 19.8202 3.14314 20.0433 3.7001 20.0433H16.3001C16.8571 20.0433 17.3912 19.8202 17.785 19.423C18.1788 19.0259 18.4001 18.4872 18.4001 17.9256V14.2197M10.0435 13.9565L10.0435 1.95654M10.0435 1.95654L5.24346 6.54169M10.0435 1.95654L14.8434 6.54169" stroke="#121416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
                onClick={ handleExport }
            />
            <div className="mx-1" />
            <ToolbarButton
                text="Share"
                addExtraPadding
                onClick={ handleShare }
            />
            <div className="mx-1" />
            <ToolbarButton
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0001 7.1999C10.6746 7.1999 9.6001 6.12539 9.6001 4.7999C9.6001 3.47442 10.6746 2.3999 12.0001 2.3999C13.3256 2.3999 14.4001 3.47442 14.4001 4.7999C14.4001 6.12539 13.3256 7.1999 12.0001 7.1999Z" stroke="#121416" strokeWidth="2"/>
                        <path d="M12.0001 14.3999C10.6746 14.3999 9.6001 13.3254 9.6001 11.9999C9.6001 10.6744 10.6746 9.5999 12.0001 9.5999C13.3256 9.5999 14.4001 10.6744 14.4001 11.9999C14.4001 13.3254 13.3256 14.3999 12.0001 14.3999Z" stroke="#121416" strokeWidth="2"/>
                        <path d="M12.0001 21.5999C10.6746 21.5999 9.6001 20.5254 9.6001 19.1999C9.6001 17.8744 10.6746 16.7999 12.0001 16.7999C13.3256 16.7999 14.4001 17.8744 14.4001 19.1999C14.4001 20.5254 13.3256 21.5999 12.0001 21.5999Z" stroke="#121416" strokeWidth="2"/>
                    </svg>
                }
                onClick={ handleMenu }
            />
        </div>
    )
}

export default memo(Toolbar)
