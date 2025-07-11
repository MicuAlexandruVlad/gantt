import React, { memo, type JSX } from "react"

type SimpleButtonProps = {
    text: string
    icon?: JSX.Element
    useSecondary?: boolean
    onClick: () => void
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
    text, icon, useSecondary = false, onClick
}) => {
    return (
        <div
            onClick={ onClick }
            className={ `flex h-full min-w-[42px] min-h-[42px] justify-center flex-row items-center gap-2 cursor-pointer rounded-md ${ useSecondary && "border-1 border-[#e5e5e5]" } p-2 bg-[#175af9] hover:bg-[#1448d1] active:bg-[#0f3bb8] ${ useSecondary && " bg-transparent hover:bg-[#f5f5f5] active:bg-[#e0e0e0]" } transition-colors` }
        >
            <span className={ `${ useSecondary ? "text-[#060606]" : "text-white" }` }>{ text }</span>
            { icon && icon }
        </div>
    )
}

export default memo(SimpleButton, (prev, next) => {
    return prev.onClick === next.onClick
})
