import { AnimatePresence, motion } from "framer-motion"
import React, { memo, useState, useRef, useEffect } from "react"

type DropdownSingleSelectInputProps = {
    options: string[]
    selectedOption: string
    onSelect: (option: string) => void
    label: string
    placeholder?: string
}

const DropdownSingleSelectInput: React.FC<DropdownSingleSelectInputProps> = ({
    options, selectedOption, onSelect, label, placeholder = "Select an option"
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={dropdownRef} className="relative">
            <span className="text-sm text-gray-600 mb-2">{ label }</span>
            <button
                type="button"
                onClick={ () => setIsOpen(!isOpen) }
                className="flex outline-none justify-between items-center w-full px-3 py-4 rounded-md border-1 border-gray-400 focus-within:border-blue-400 bg-white"
            >
                <span className={ `${ !selectedOption && "text-[#828282]" }` }>{ selectedOption ? selectedOption : placeholder }</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            <AnimatePresence mode='wait'>
            {
                isOpen && (
                    <motion.div
                        initial={{ x: 0, y: -10, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: 0, y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                        {options.map((option) => (
                            <div
                                key={ option }
                                onClick={() => {
                                    onSelect(option)
                                    setIsOpen(false)
                                }}
                                className={ `flex flex-row justify-between items-center px-3 py-4 ${ selectedOption === option ? "bg-[#f3f5fc]" : "bg-white" } hover:bg-gray-100 focus:bg-gray-100 focus:outline-none` }
                            >
                                { option }
                                { selectedOption === option && selectedIcon }
                            </div>
                        ))}
                    </motion.div>
                )
            }
            </AnimatePresence>
        </div>
    )
}

const selectedIcon = (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8 1.3999L3.64043 8.5999L1.19995 6.14562" stroke="#060606" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default memo(DropdownSingleSelectInput)
