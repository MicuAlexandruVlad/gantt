import React from "react"

type ProgressDisplayProps = {
    progress: number
    size?: number
    strokeWidth?: number
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ 
    progress, 
    size = 16, 
    strokeWidth = 2
}) => {
    const progressPercentage = Math.min(Math.max(progress, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width={ size }
                height={ size }
            >
                {/* Background circle */}
                <circle
                    cx={ size / 2 }
                    cy={ size / 2 }
                    r={ radius }
                    stroke="#e5e7eb"
                    strokeWidth={ strokeWidth }
                    fill="transparent"
                />
                {/* Progress circle */}
                <circle
                    cx={ size / 2 }
                    cy={ size / 2 }
                    r={ radius }
                    stroke="#2563eb"
                    strokeWidth={ strokeWidth }
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-in-out"
                />
            </svg>
        </div>
    )
}

export default React.memo(ProgressDisplay, (prevProps, nextProps) => {
    return prevProps.progress === nextProps.progress
})
