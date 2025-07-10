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
    isActive: true,
}, {
    id: '3',
    name: 'Design UI Components',
    start: new Date('2023-10-11'),
    end: new Date('2023-10-15'),
    progress: 80,
    priority: 'high',
    assignedTo: [{
        id: '4',
        name: 'Emily Chen'
    }],
    dependencies: ['2'],
    description: 'Create reusable UI components for the dashboard.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '4',
    name: 'API Integration',
    start: new Date('2023-10-16'),
    end: new Date('2023-10-20'),
    progress: 25,
    priority: 'medium',
    assignedTo: [{
        id: '5',
        name: 'Mike Wilson'
    }, {
        id: '6',
        name: 'Sarah Davis'
    }],
    dependencies: ['3'],
    description: 'Integrate third-party APIs for data synchronization.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '5',
    name: 'Database Optimization',
    start: new Date('2023-10-21'),
    end: new Date('2023-10-25'),
    progress: 90,
    priority: 'low',
    assignedTo: [{
        id: '7',
        name: 'David Brown'
    }],
    dependencies: [],
    description: 'Optimize database queries for better performance.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
}, {
    id: '6',
    name: 'User Authentication System',
    start: new Date('2023-10-26'),
    end: new Date('2023-10-30'),
    progress: 100,
    priority: 'high',
    assignedTo: [{
        id: '8',
        name: 'Lisa Garcia'
    }],
    dependencies: ['4'],
    description: 'Implement secure user authentication and authorization.',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '7',
    name: 'Testing & QA',
    start: new Date('2023-11-01'),
    end: new Date('2023-11-05'),
    progress: 40,
    priority: 'medium',
    assignedTo: [{
        id: '9',
        name: 'Robert Martinez'
    }, {
        id: '10',
        name: 'Anna Thompson'
    }],
    dependencies: ['5', '6'],
    description: 'Comprehensive testing of all application features.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '8',
    name: 'Documentation',
    start: new Date('2023-11-06'),
    end: new Date('2023-11-08'),
    progress: 15,
    priority: 'low',
    assignedTo: [{
        id: '11',
        name: 'Kevin Lee'
    }],
    dependencies: [],
    description: 'Create comprehensive documentation for the project.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '9',
    name: 'Performance Monitoring Setup',
    start: new Date('2023-11-09'),
    end: new Date('2023-11-12'),
    progress: 70,
    priority: 'medium',
    assignedTo: [{
        id: '12',
        name: 'Michelle White'
    }],
    dependencies: ['7'],
    description: 'Set up monitoring tools for application performance tracking.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '10',
    name: 'Security Audit',
    start: new Date('2023-11-13'),
    end: new Date('2023-11-17'),
    progress: 60,
    priority: 'high',
    assignedTo: [{
        id: '13',
        name: 'James Rodriguez'
    }],
    dependencies: ['6'],
    description: 'Conduct thorough security audit of the application.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '11',
    name: 'Mobile App Development',
    start: new Date('2023-11-18'),
    end: new Date('2023-11-25'),
    progress: 30,
    priority: 'medium',
    assignedTo: [{
        id: '14',
        name: 'Amy Johnson'
    }, {
        id: '15',
        name: 'Chris Taylor'
    }],
    dependencies: ['3'],
    description: 'Develop mobile application for iOS and Android platforms.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '12',
    name: 'Deployment & Launch',
    start: new Date('2023-11-26'),
    end: new Date('2023-11-30'),
    progress: 0,
    priority: 'high',
    assignedTo: [{
        id: '16',
        name: 'Tom Anderson'
    }],
    dependencies: ['9', '10'],
    description: 'Deploy application to production and coordinate launch.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
}, {
    id: '13',
    name: 'Code Review & Refactoring',
    start: new Date('2023-12-01'),
    end: new Date('2023-12-05'),
    progress: 85,
    priority: 'medium',
    assignedTo: [{
        id: '17',
        name: 'Daniel Kim'
    }],
    dependencies: ['11'],
    description: 'Review codebase and refactor for maintainability.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '14',
    name: 'User Training Materials',
    start: new Date('2023-12-06'),
    end: new Date('2023-12-10'),
    progress: 20,
    priority: 'low',
    assignedTo: [{
        id: '18',
        name: 'Rachel Green'
    }, {
        id: '19',
        name: 'Mark Thompson'
    }],
    dependencies: ['8'],
    description: 'Create training videos and user guides.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '15',
    name: 'Data Migration',
    start: new Date('2023-12-11'),
    end: new Date('2023-12-15'),
    progress: 45,
    priority: 'high',
    assignedTo: [{
        id: '20',
        name: 'Steven Clark'
    }],
    dependencies: ['5'],
    description: 'Migrate legacy data to new system.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '16',
    name: 'Load Testing',
    start: new Date('2023-12-16'),
    end: new Date('2023-12-20'),
    progress: 75,
    priority: 'high',
    assignedTo: [{
        id: '21',
        name: 'Patricia Lewis'
    }],
    dependencies: ['9'],
    description: 'Conduct load testing to ensure system scalability.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '17',
    name: 'Backup & Recovery Setup',
    start: new Date('2023-12-21'),
    end: new Date('2023-12-23'),
    progress: 100,
    priority: 'medium',
    assignedTo: [{
        id: '22',
        name: 'Brian Walker'
    }],
    dependencies: ['15'],
    description: 'Implement automated backup and disaster recovery procedures.',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '18',
    name: 'Analytics Integration',
    start: new Date('2024-01-02'),
    end: new Date('2024-01-08'),
    progress: 10,
    priority: 'medium',
    assignedTo: [{
        id: '23',
        name: 'Jennifer Hall'
    }],
    dependencies: ['12'],
    description: 'Integrate analytics tools for user behavior tracking.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '19',
    name: 'Customer Support Portal',
    start: new Date('2024-01-09'),
    end: new Date('2024-01-15'),
    progress: 35,
    priority: 'low',
    assignedTo: [{
        id: '24',
        name: 'Jason Young'
    }, {
        id: '25',
        name: 'Laura Adams'
    }],
    dependencies: ['14'],
    description: 'Build customer support ticketing system.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '20',
    name: 'Payment Gateway Integration',
    start: new Date('2024-01-16'),
    end: new Date('2024-01-22'),
    progress: 55,
    priority: 'high',
    assignedTo: [{
        id: '26',
        name: 'Michael Scott'
    }],
    dependencies: ['6'],
    description: 'Integrate secure payment processing system.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '21',
    name: 'Social Media Integration',
    start: new Date('2024-01-23'),
    end: new Date('2024-01-29'),
    progress: 90,
    priority: 'low',
    assignedTo: [{
        id: '27',
        name: 'Nancy Wilson'
    }],
    dependencies: ['18'],
    description: 'Add social media login and sharing capabilities.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
}, {
    id: '22',
    name: 'Final Security Review',
    start: new Date('2024-01-30'),
    end: new Date('2024-02-05'),
    progress: 0,
    priority: 'high',
    assignedTo: [{
        id: '28',
        name: 'Paul Martin'
    }],
    dependencies: ['20', '21'],
    description: 'Comprehensive final security assessment before production.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
}]

export const tasksAtom = atom<Task[]>(defaultTasks)
tasksAtom.debugLabel = 'tasksAtom'

export const selectedTasksAtom = atom<Set<string>>(new Set<string>())
selectedTasksAtom.debugLabel = 'selectedTasksAtom'

export const allSelectedAtom = atom(
    // Getter: compute if all tasks are selected
    (get) => {
        const tasks = get(tasksAtom)
        const selected = get(selectedTasksAtom)
        return tasks.length > 0 && selected.size === tasks.length
    },
    // Setter: toggle select all/none
    (get, set) => {
        const tasks = get(tasksAtom)
        const selected = get(selectedTasksAtom)
        
        if (selected.size === tasks.length) {
            // All selected, so deselect all
            set(selectedTasksAtom, new Set())
        } else {
            // Not all selected, so select all
            set(selectedTasksAtom, new Set(tasks.map(t => t.id)))
        }
    }
)
allSelectedAtom.debugLabel = 'allSelectedAtom'


