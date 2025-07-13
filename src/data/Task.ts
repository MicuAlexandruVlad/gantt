import type Assignee from "./Assignee"

export type priority = 'low' | 'medium' | 'high'

export interface BaseTask {
    id: string
    name: string
    start: Date
    end: Date
    completed?: boolean // Optional, to indicate if the task is completed
    createdAt?: Date // Optional, to track when the task was created
    updatedAt?: Date // Optional, to track when the task was last updated
    color?: string // Optional, to allow for task color customization
    customFields?: Record<string, any> // Optional, for additional custom data
    tags?: string[] // Optional, to allow for tagging tasks
    estimatedHours?: number // Optional, to indicate estimated hours for the task
    actualHours?: number // Optional, to track actual hours spent on the task
    isCritical?: boolean // Optional, to indicate if the task is critical
    notes?: string // Optional, for additional notes or comments on the task
    isReadOnly?: boolean // Optional, to indicate if the task is read-only and cannot be edited
    parentTaskId?: string // Optional, to link to a parent task if this is a subtask
    customData?: any // Optional, to allow for any additional custom data structure
}

export default interface Task extends BaseTask {
    progress: number // Optional, as some tasks may not have progress defined
    dependencies?: string[] // Optional, to allow for task dependencies
    description?: string // Optional, for additional task details
    priority: priority // Optional, to indicate task priority
    assignedTo: Assignee[] // Optional, to indicate who the task is assigned to
    isActive?: boolean // Optional, to indicate if the task is currently active
}
