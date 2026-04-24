import type { Task } from "@/type"
import { Heading } from "../Heading";
import { TaskCard } from "./TaskCard";
import { statusConfig } from "@/lib/taskStatus";

interface Props {
    tasks: Task[]
}

interface GropuedTasks {
    [key: string]: Task[]
}

const initialStatusGroup: GropuedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

export function TasksList({ tasks }: Props) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);

    return (
        <>
            <Heading 
                title=""
                subtitle="Todas las tareas"
            />

            <div className='flex gap-5 pb-32 mt-5 overflow-x-scroll 2xl:overflow-auto'>
                {Object.entries(groupedTasks).map(([status, tasks]) => {
                    const config = statusConfig[status as Task["status"]];
                    return (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <div className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 ${config.headerBg}`}>
                                <span className={`inline-block size-2.5 rounded-full ${config.dot}`} />
                                <h3 className={`text-sm font-bold uppercase tracking-wide ${config.headerText}`}>
                                    {config.label}
                                </h3>
                                <span className={`ml-auto inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ${config.badge}`}>
                                    {tasks.length}
                                </span>
                            </div>

                            <ul className='mt-3 space-y-3'>
                                {tasks.length === 0 ? (
                                    <li className="py-8 text-sm text-center text-gris-400">No hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} />)
                                )}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
