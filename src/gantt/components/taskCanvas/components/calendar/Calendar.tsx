import React, { memo } from "react"

type CalendarProps = {

}

const Calendar: React.FC<CalendarProps> = () => {
    return (
        <div className="flex shadow-md bg-white sticky top-0 p-3 z-10">
            <span>Calendar placeholder</span>
        </div>
    )
}

export default memo(Calendar)
