import { atom } from 'jotai'
import type Task from '../../data/Task'

const defaultTasks: Task[] = [{
    id: '1',
    name: 'Some task with a very long name that should be truncated in the UI',
    start: new Date('2023-10-01'),
    end: new Date('2023-10-05'),
    progress: 0,
    priority: 'medium',
    assignedTo: [{
        id: '1',
        name: 'John Doe'
    }, {
        id: '3',
        name: 'Alice Johnson'
    }],
    dependencies: [],
    description: 'This is a sample task for demonstration purposes.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '2',
    name: 'Second Task',
    start: new Date('2023-10-06'),
    end: new Date('2023-10-10'),
    progress: 50,
    priority: 'high',
    assignedTo: [{
        id: '2',
        name: 'Jane Smith'
    }],
    dependencies: ['1'],
    description: 'This task is not dependent on the first task.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
}]

export const tasksAtom = atom<Task[]>(defaultTasks)


