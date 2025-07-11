import { useAtom } from "jotai"
import React, { memo, useEffect, useMemo } from "react"
import { floatingAlertAtom } from "../../../store/FloatingAlertStore"
import { RESET } from "jotai/utils"
import { AnimatePresence, motion } from "framer-motion"

export interface FloatingAlertProps {
    visible: boolean
    title: string
    message: string
    type: "info" | "success" | "warning" | "error"
    duration?: number // in milliseconds, default is 3000
}

const FloatingAlert: React.FC = () => {
    const [{ message, visible, title, type, duration = 3000 }, setData] = useAtom(floatingAlertAtom)

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setData(RESET)
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [visible, duration])

    const bgColor = useMemo(() => {
        switch (type) {
            case "info":
                return "bg-blue-100 text-blue-800"
            case "success":
                return "bg-green-100 text-green-800"
            case "warning":
                return "bg-yellow-100 text-yellow-800"
            case "error":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }, [type])

    const timerColor = useMemo(() => {
        switch (type) {
            case "info":
                return "bg-blue-400"
            case "success":
                return "bg-green-800"
            case "warning":
                return "bg-yellow-800"
            case "error":
                return "bg-red-400"
            default:
                return "bg-gray-800"
        }
    }, [type])

    return (
        <AnimatePresence mode="wait">
        {
            visible &&
            <motion.div
                key="floating-alert"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col absolute z-2000 top-2 right-2 py-2 px-4 rounded-md ${bgColor} drop-shadow-lg`}
            >
                <span className="font-bold">{title}</span>
                <span className="mt-1">{message}</span>
                <motion.div
                    className={`absolute bottom-0 left-0 right-0 rounded-bl-md rounded-br-md h-[4px] ${timerColor}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                />
            </motion.div>
        }
        </AnimatePresence>
    )
}

export default memo(FloatingAlert)
