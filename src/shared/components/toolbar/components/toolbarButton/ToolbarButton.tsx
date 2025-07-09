import React, { memo, type JSX } from "react"

type ToolbarButtonProps = {
    text?: string
    icon?: JSX.Element
    usePrimary?: boolean
    useRound?: boolean
    addExtraPadding?: boolean
    onClick: () => void
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    text, icon, useRound = false, addExtraPadding = false, usePrimary = false, onClick
}) => {
    return (
        <div
            onClick={ onClick }
            className={ `flex h-full min-w-[42px] min-h-[42px] justify-center flex-row items-center gap-2 cursor-pointer ${ !usePrimary && "border-1 border-[#e5e5e5]" } ${ useRound ? "rounded-full" : "rounded-md" } p-2 ${ usePrimary && "bg-[#175af9]" } ${ addExtraPadding && "px-4" } ${ usePrimary ? "hover:bg-[#1448d1] active:bg-[#0f3bb8]" : "hover:bg-[#f5f5f5] active:bg-[#e0e0e0]" } transition-colors` }>
            { icon && icon }
            { text && (
                <span className={ `${ usePrimary && "text-white" }` }>{ text }</span>
            )}
        </div>
    )
}

export default memo(ToolbarButton, (prev, next) => true)
