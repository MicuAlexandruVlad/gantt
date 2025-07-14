import { atom } from "jotai";

const defaultCellWidth = 50 // Default width in pixels
const stepSize = 10

export const defaultRowHeight = 50

export const canvasCellWidthAtom = atom(defaultCellWidth)

export const increaseCanvasCellWidthAtom = atom(
    null,
    (get, set) => {
        const currentWidth = get(canvasCellWidthAtom)
        const newWidth = currentWidth + stepSize
        console.log(`Increasing canvas cell width: ${currentWidth} + ${stepSize} = ${newWidth}`)
        set(canvasCellWidthAtom, currentWidth + stepSize)
    }
)

export const decreaseCanvasCellWidthAtom = atom(
    null,
    (get, set) => {
        const currentWidth = get(canvasCellWidthAtom)
        if (currentWidth > defaultCellWidth) {
            set(canvasCellWidthAtom, currentWidth - stepSize)
        }
    }
)

export const startingDateAtom = atom(new Date())

