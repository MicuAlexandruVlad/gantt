import { atom } from 'jotai'
import type Task from '../../data/Task'


const assigneeNames = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Emily Chen',
    'Mike Wilson',
    'Sarah Davis',
    'David Brown',
    'Lisa Garcia',
    'Robert Martinez',
    'Anna Thompson',
    'Kevin Lee',
    'Michelle White',
    'James Rodriguez'
]

const taskNames = [
    'Design Dashboard',
    'Implement Authentication',
    'Setup Database',
    'Create API Endpoints',
    'Develop Frontend',
    'Write Unit Tests',
    'Deploy Application',
    'Monitor Performance',
    'Conduct User Testing',
    'Gather Feedback',
    'Refactor Codebase',
    'Optimize Performance',
    'Document Code',
    'Prepare Release Notes',
    'Plan Next Sprint',
    'Conduct Retrospective',
    'Update Dependencies',
    'Fix Bugs',
    'Improve UI/UX',
    'Conduct Code Review',
    'Setup CI/CD Pipeline',
    'Implement Security Measures',
    'Create User Guides',
    'Train Team Members',
    'Conduct Knowledge Sharing',
    'Setup Development Environment',
    'Conduct Team Building',
    'Review Project Goals',
    'Conduct Market Research',
    'Analyze User Behavior',
    'Implement New Features',
    'Conduct A/B Testing',
]

const taskDescriptions = [
    'This task involves designing the initial layout and components for the dashboard.',
    'Implement user authentication using JWT and OAuth protocols.',
    'Setup the database schema and initial data migration scripts.',
    'Create RESTful API endpoints for user management and data retrieval.',
    'Develop the frontend application using React and Redux.',
    'Write unit tests for critical components to ensure code quality.',
    'Deploy the application to production environment using Docker.',
    'Monitor application performance using APM tools like New Relic.',
    'Conduct user testing sessions to gather feedback on usability.',
    'Gather feedback from users to improve features and functionality.',
    'Refactor codebase to improve maintainability and readability.',
    'Optimize performance by analyzing bottlenecks and improving algorithms.',
    'Document code thoroughly for future reference and onboarding new developers.',
    'Prepare release notes summarizing changes and new features in the latest version.',
    'Plan next sprint by reviewing backlog and prioritizing tasks.',
    'Conduct retrospective meeting to discuss what went well and what can be improved.',
    'Update project dependencies to the latest versions for security and performance improvements.',
    'Fix bugs reported by users and improve overall application stability.',
    'Improve UI/UX by implementing user feedback and best practices.',
    'Conduct code review sessions to ensure code quality and adherence to standards.',
    'Setup CI/CD pipeline using GitHub Actions for automated testing and deployment.',
    'Implement security measures to protect user data and prevent unauthorized access.',
    'Create user guides and documentation to help users navigate the application.',
    'Train team members on new technologies and best practices.',
    'Conduct knowledge sharing sessions to promote learning within the team.',
    'Setup development environment with necessary tools and configurations.',
    'Conduct team building activities to improve collaboration and morale.',
    'Review project goals and ensure alignment with business objectives.',
    'Conduct market research to identify trends and opportunities for improvement.',
    'Analyze user behavior using analytics tools to understand usage patterns.',
    'Implement new features based on user feedback and market research.',
    'Conduct A/B testing to evaluate the effectiveness of new features.',
    'This task involves designing the initial layout and components for the dashboard.',
]

const generateTasks = (numTasks: number, startDate: Date, endDate: Date, maxSizeInDays: number): Task[] => {
    return Array.from({ length: numTasks }, (_, index) => {
        const taskStart = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
        const taskEnd = new Date(taskStart.getTime() + Math.random() * maxSizeInDays * 24 * 60 * 60 * 1000)

        return {
            id: (index + 1).toString(),
            name: taskNames[index % taskNames.length],
            start: taskStart,
            end: taskEnd,
            progress: Math.floor(Math.random() * 101),
            priority: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
            assignedTo: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
                id: (Math.floor(Math.random() * assigneeNames.length) + 1).toString(),
                name: assigneeNames[Math.floor(Math.random() * assigneeNames.length)]
            })),
            dependencies: [],
            description: taskDescriptions[index % taskDescriptions.length],
            completed: Math.random() < 0.5,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        }
    })
}

const defaultTasks: Task[] = generateTasks(10, new Date('2025-05-01'), new Date('2025-07-30'), 10)

export const tasksAtom = atom<Task[]>(defaultTasks)
tasksAtom.debugLabel = 'tasksAtom'

export const updateTaskAtom = atom(
    null,
    (get, set, task: Task) => {
        const tasks = get(tasksAtom)
        const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, ...task } : t)

        set(tasksAtom, updatedTasks)
    }
)

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


