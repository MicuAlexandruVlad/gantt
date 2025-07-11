import { atom } from "jotai";
import { atomWithReset, RESET } from "jotai/utils";
import { useAtom } from "jotai";

export const newTaskModalFormDataAtom = atomWithReset({
    taskName: "",
    description: "",
    startDate: null as Date | null,
    dueDate: null as Date | null,
})

export const newTaskModalFormValidationAtom = atom((get) => {
    const formData = get(newTaskModalFormDataAtom)

    return formData.taskName.trim().length > 0 
        && formData.startDate !== null 
        && formData.dueDate !== null 
        && formData.startDate <= formData.dueDate
})

// Individual field atoms for better performance
const taskNameAtom = atom(
    (get) => get(newTaskModalFormDataAtom).taskName,
    (get, set, value: string) => {
        const current = get(newTaskModalFormDataAtom)
        set(newTaskModalFormDataAtom, { ...current, taskName: value })
    }
)

const descriptionAtom = atom(
    (get) => get(newTaskModalFormDataAtom).description,
    (get, set, value: string) => {
        const current = get(newTaskModalFormDataAtom)
        set(newTaskModalFormDataAtom, { ...current, description: value })
    }
)

const startDateAtom = atom(
    (get) => get(newTaskModalFormDataAtom).startDate,
    (get, set, value: Date | null) => {
        const current = get(newTaskModalFormDataAtom)
        set(newTaskModalFormDataAtom, { ...current, startDate: value })
    }
)

const dueDateAtom = atom(
    (get) => get(newTaskModalFormDataAtom).dueDate,
    (get, set, value: Date | null) => {
        const current = get(newTaskModalFormDataAtom)
        set(newTaskModalFormDataAtom, { ...current, dueDate: value })
    }
)

// Custom hook for form management
export const useNewTaskForm = () => {
    const [formData, setFormData] = useAtom(newTaskModalFormDataAtom)
    const [isValid] = useAtom(newTaskModalFormValidationAtom)
    
    return {
        // Individual field hooks
        useTaskName: () => useAtom(taskNameAtom),
        useDescription: () => useAtom(descriptionAtom),
        useStartDate: () => useAtom(startDateAtom),
        useDueDate: () => useAtom(dueDateAtom),
        
        // Form-level actions
        isValid,
        formData, // Only use this for form submission
        resetForm: () => setFormData(RESET)
    }
}
