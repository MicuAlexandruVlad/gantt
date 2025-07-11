import React, { memo, useCallback, useMemo, useRef, useState } from "react"

type DatePickerInputProps = {
    value: Date | null
    label: string
    placeholder: string
    onChange: (date: Date) => void
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, label, placeholder, onChange }) => {
    const [pickerVisible, setPickerVisible] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const formattedValue = useMemo(() => {
        if (!value) return ''
        
        const year = value.getFullYear()
        const month = String(value.getMonth() + 1).padStart(2, '0')
        const day = String(value.getDate()).padStart(2, '0')
        
        return `${year}-${month}-${day}`
    }, [value])

    const displayValue = useMemo(() => {
        if (!value) return placeholder
        return value.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })
    }, [value, placeholder])

    const handleInputClick = useCallback(() => {
        if (inputRef.current) {
            !pickerVisible ? inputRef.current.showPicker() : inputRef.current.blur()

            setPickerVisible(!pickerVisible)
        }
    }, [pickerVisible])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const dateParts = e.target.value
        setPickerVisible(false)
        onChange(new Date(dateParts))
    }, [onChange])

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-600 mb-2">{ label }</span>
            <div className="relative">
                {/* Hidden native input for functionality */}
                <input
                    ref={ inputRef }
                    type="date"
                    onClick={ handleInputClick }
                    value={ formattedValue }
                    onChange={ handleChange }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                {/* Custom display */}
                <div className="flex outline-none w-full px-3 py-4 pr-10 rounded-md border border-gray-400 focus-within:border-blue-400 bg-white pointer-events-none">
                    <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                        { displayValue }
                    </span>
                </div>
                
                {/* Custom calendar icon */}
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.14286 6.90176H14.7812M4.48512 1.4375V3.07698M15.3125 1.4375V3.07678M18.5 6.07678L18.5 17.5625C18.5 19.2194 17.1569 20.5625 15.5 20.5625H4.5C2.84315 20.5625 1.5 19.2194 1.5 17.5625V6.07678C1.5 4.41992 2.84315 3.07678 4.5 3.07678H15.5C17.1569 3.07678 18.5 4.41992 18.5 6.07678Z" stroke="#121416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}

export default memo(DatePickerInput)
