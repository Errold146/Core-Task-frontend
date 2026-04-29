import { useState } from "react"
import { toast } from "sonner"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DragDropProvider, DragOverlay, useDroppable } from "@dnd-kit/react"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/dom"

import type { Task } from "@/type"
import { updateStatus } from "@/api/TaskAPI"
import { Heading } from "../Heading"
import { TaskCard } from "./TaskCard"
import { statusConfig } from "@/lib/taskStatus"

interface Props {
    tasks: Task[]
    canDelete: boolean
}

interface GroupedTasks {
    [key: string]: Task[]
}

const initialStatusGroup: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

interface TaskColumnProps {
    status: Task["status"]
    tasks: Task[]
    canDelete: boolean
}

function TaskColumn({ status, tasks, canDelete }: TaskColumnProps) {
    const { ref, isDropTarget } = useDroppable({ id: status })
    const config = statusConfig[status]

    return (
        <div className="flex flex-col min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <div className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 ${config.headerBg}`}>
                <span className={`inline-block size-2.5 rounded-full ${config.dot}`} />
                <h3 className={`text-sm font-bold uppercase tracking-wide ${config.headerText}`}>
                    {config.label}
                </h3>
                <span className={`ml-auto inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ${config.badge}`}>
                    {tasks.length}
                </span>
            </div>

            <ul
                ref={ref}
                className={`flex-1 mt-3 space-y-3 min-h-[120px] rounded-xl p-2 transition-all duration-200 ${
                    isDropTarget
                        ? "ring-2 ring-dashed ring-azul-400 bg-azul-50/60 scale-[1.015]"
                        : "ring-transparent"
                }`}
            >
                {tasks.length === 0 ? (
                    <li className={`flex flex-col items-center justify-center py-10 text-sm rounded-lg border-2 border-dashed transition-colors duration-200 ${
                        isDropTarget
                            ? `border-azul-400 text-azul-500 bg-white/70`
                            : "border-gris-200 text-gris-400"
                    }`}>
                        <span>{isDropTarget ? "¡Suelta aquí!" : "No hay tareas"}</span>
                    </li>
                ) : (
                    tasks.map(task => <TaskCard key={task._id} task={task} canDelete={canDelete} />)
                )}
            </ul>
        </div>
    )
}

export function TasksList({ tasks, canDelete }: Props) {
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    const [draggingTask, setDraggingTask] = useState<Task | null>(null)

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : []
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup }
    }, initialStatusGroup)

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onMutate: async ({ taskId, status: newStatus }) => {
            await queryClient.cancelQueries({ queryKey: ["project", projectId] })
            const previous = queryClient.getQueryData(["project", projectId])
            queryClient.setQueryData(["project", projectId], (old: any) => {
                if (!old) return old
                return {
                    ...old,
                    tasks: old.tasks.map((t: Task) =>
                        t._id === taskId ? { ...t, status: newStatus } : t
                    ),
                }
            })
            return { previous }
        },
        onError: (error, _, context) => {
            toast.error(error.message)
            if (context?.previous) {
                queryClient.setQueryData(["project", projectId], context.previous)
            }
        },
        onSuccess: (data) => {
            toast.success(data)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] })
        },
    })

    const handleDragStart = (event: DragStartEvent) => {
        const task = tasks.find(t => t._id === event.operation.source?.id)
        setDraggingTask(task ?? null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        setDraggingTask(null)
        if (event.operation.canceled) return
        const taskId = event.operation.source?.id as string
        const newStatus = event.operation.target?.id as Task["status"]
        if (!taskId || !newStatus) return
        const task = tasks.find(t => t._id === taskId)
        if (!task || task.status === newStatus) return
        mutate({ projectId, taskId, status: newStatus })
    }

    return (
        <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Heading
                title=""
                subtitle="Todas las tareas"
            />

            <div className="flex gap-5 pb-32 mt-5 overflow-x-scroll 2xl:overflow-auto">
                {Object.entries(groupedTasks).map(([status, columnTasks]) => (
                    <TaskColumn
                        key={status}
                        status={status as Task["status"]}
                        tasks={columnTasks}
                        canDelete={canDelete}
                    />
                ))}
            </div>

            <DragOverlay>
                {draggingTask && (() => {
                    const config = statusConfig[draggingTask.status]
                    return (
                        <div className={`w-[280px] rounded-xl border border-gris-200 border-l-4 ${config.borderColor} bg-white p-5 shadow-2xl rotate-1 opacity-95 pointer-events-none`}>
                            <div className="flex items-center gap-2 mb-2">
                                <p className="text-base font-bold text-gris-800 truncate">{draggingTask.name}</p>
                                <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.badge}`}>
                                    {config.label}
                                </span>
                            </div>
                            <p className="text-sm text-gris-500 line-clamp-2">{draggingTask.description}</p>
                        </div>
                    )
                })()}
            </DragOverlay>
        </DragDropProvider>
    )
}
