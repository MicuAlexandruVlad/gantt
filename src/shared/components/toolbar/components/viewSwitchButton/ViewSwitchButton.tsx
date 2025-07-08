import React, { type JSX } from "react"

interface ViewSwitchButtonProps {
    active?: boolean
    icon: JSX.Element
    buttonText: string
    onClick: () => void
}

const ViewSwitchButton: React.FC<ViewSwitchButtonProps> = ({ active, icon, buttonText, onClick }) => {
    return (
        <div
            onClick={ onClick }
            className="flex flex-col cursor-pointer"
        >
            <div className="flex flex-row items-center">
                { icon }
                <span className={ `ml-2 ${ active ? "text-[#175af9]" : 'text-[#616163]' } text-lg` }>{ buttonText }</span>
            </div>
            {/* <div className={ `w-full h-[2px] mt-4 bg-[#175af9] ${ active ? "opacity-100" : "opacity-0" }` } /> */}
        </div>
    )
}

export default React.memo(ViewSwitchButton)
