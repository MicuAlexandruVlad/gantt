import React, { type JSX } from "react"

interface ViewSwitchButtonProps {
    icon: JSX.Element
    onClick: () => void
}

const ViewSwitchButton: React.FC<ViewSwitchButtonProps> = ({ icon, onClick }) => {
    return (
        <div>
            { icon }
        </div>
    )
}

export default React.memo(ViewSwitchButton)
