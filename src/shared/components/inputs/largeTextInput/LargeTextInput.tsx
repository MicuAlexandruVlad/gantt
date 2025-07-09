import React, { memo, useCallback } from "react"

type LargeTextInputProps = {
    label: string
    value: string
    rows?: number
    placeholder?: string
    onChange: (value: string) => void
}

const LargeTextInput: React.FC<LargeTextInputProps> = ({ label, value, rows = 2, placeholder, onChange }) => {

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    }, [])

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-600 mb-2">{ label }</span>
            <textarea
                rows={ rows }
                value={ value }
                placeholder={ placeholder }
                onChange={ handleChange }
                spellCheck="false"
                autoCorrect="off"
                className="flex min-h-20 outline-none w-full px-3 py-4 rounded-md border-1 border-gray-400 focus-within:border-blue-400 bg-white"
            />
        </div>
    )
}

export default memo(LargeTextInput)
