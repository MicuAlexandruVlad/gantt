import React, { memo, useCallback } from "react"

type TextInputProps = {
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

const TextInput: React.FC<TextInputProps> = ({ label, value, placeholder, onChange }) => {

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }, [])

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-600 mb-2">{ label }</span>
            <input
                type="text"
                value={ value }
                placeholder={ placeholder }
                onChange={ handleChange }
                spellCheck="false"
                autoCorrect="off"
                className="flex outline-none w-full px-3 py-4 rounded-md border-1 border-gray-400 focus-within:border-blue-400 bg-white"
            />
        </div>
    )
}

export default memo(TextInput)
