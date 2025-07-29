import React, { memo } from "react"


type Props = {
    checked: boolean
    onChange: () => void
}

const Checkbox: React.FC<Props> = ({ checked, onChange }) => {
    return (
        <div
            onClick={ onChange }
            className={`flex items-center justify-center ${ checked ? 'bg-[#415BE9]' : 'bg-[#F5F5F5]' } w-[16px] h-[16px] ${ !checked ? 'border border-[#C5C5C5]' : '' } rounded-[4px] transition-colors duration-200`}
        >
            { checked && checkSVG }
        </div>
    )
}

const checkSVG = (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.83209 0.444323C8.06893 0.700402 8.05333 1.09999 7.79725 1.33683L3.19807 5.59047C2.94902 5.8208 2.56251 5.81326 2.32264 5.5734L0.184988 3.43577C-0.0616605 3.18912 -0.0616628 2.78923 0.184983 2.54258C0.431628 2.29593 0.831521 2.29593 1.07817 2.54258L2.78632 4.25071L6.93958 0.409487C7.19566 0.172648 7.59525 0.188244 7.83209 0.444323Z" fill="white"/>
    </svg>
)

export default memo(Checkbox, (prev, next) => {
    return prev.checked === next.checked
})
