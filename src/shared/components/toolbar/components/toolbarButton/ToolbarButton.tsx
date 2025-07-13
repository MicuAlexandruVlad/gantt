import React, { memo, useMemo, type JSX } from "react"

type ToolbarButtonProps = {
    text?: string
    icon?: JSX.Element
    bgColor?: string
    textColor?: React.HTMLAttributes<HTMLSpanElement>['className']
    useRound?: boolean
    addExtraPadding?: boolean
    onClick: () => void
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    text, icon, bgColor, textColor, useRound = false, addExtraPadding = false, onClick
}) => {
    const bgDerivedColors = useMemo(() => {
        if (!bgColor) return null
        
        // Convert hex to RGB
        const hex = bgColor.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        
        // Create darker versions (reduce by 15 and 30 respectively)
        const hoverR = Math.max(0, r - 15)
        const hoverG = Math.max(0, g - 15)
        const hoverB = Math.max(0, b - 15)
        
        const activeR = Math.max(0, r - 30)
        const activeG = Math.max(0, g - 30)
        const activeB = Math.max(0, b - 30)
        
        const hoverHex = `#${hoverR.toString(16).padStart(2, '0')}${hoverG.toString(16).padStart(2, '0')}${hoverB.toString(16).padStart(2, '0')}`
        const activeHex = `#${activeR.toString(16).padStart(2, '0')}${activeG.toString(16).padStart(2, '0')}${activeB.toString(16).padStart(2, '0')}`

        return {
            hover: hoverHex,
            active: activeHex
        }
    }, [bgColor])
    
    return (
        <div
            onClick={onClick}
            className={`flex h-full ${ bgColor && `bg-[${bgColor}]` } min-w-[42px] min-h-[42px] justify-center flex-row items-center gap-2 cursor-pointer ${!bgColor && "border-1 border-[#e5e5e5]"} ${useRound ? "rounded-full" : "rounded-md"} p-2 ${addExtraPadding && "px-4"} transition-colors ${bgColor ? '' : 'bg-white hover:bg-[#f5f5f5] active:bg-[#e0e0e0]'}`}
            onMouseEnter={(e) => {
                if (bgColor && bgDerivedColors) {
                    e.currentTarget.style.backgroundColor = bgDerivedColors.hover
                }
            }}
            onMouseLeave={(e) => {
                if (bgColor) {
                    e.currentTarget.style.backgroundColor = bgColor
                }
            }}
            onMouseDown={(e) => {
                if (bgColor && bgDerivedColors) {
                    e.currentTarget.style.backgroundColor = bgDerivedColors.active
                }
            }}
            onMouseUp={(e) => {
                if (bgColor && bgDerivedColors) {
                    e.currentTarget.style.backgroundColor = bgDerivedColors.hover
                }
            }}
        >
            {icon && icon}
            {text && (
                <span className={textColor}>{text}</span>
            )}
        </div>
    )
}

export default memo(ToolbarButton, (prev, next) => prev.onClick === next.onClick)
