import type Task from "../../../data/Task";

export const getDateRange = (tasks: Task[]): { start: Date; end: Date } => {
    if (tasks.length === 0) {
        return { start: new Date(), end: new Date() }
    }

    const start = tasks.reduce((min, task) => {
        const taskStart = new Date(task.start)
        return taskStart < min ? taskStart : min
    }, new Date(tasks[0].start))

    const end = tasks.reduce((max, task) => {
        const taskEnd = new Date(task.end)
        return taskEnd > max ? taskEnd : max
    }, new Date(tasks[0].end))

    return { start, end }
}
