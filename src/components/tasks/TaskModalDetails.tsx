import { toast } from 'sonner';
import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import {ArrowRightIcon, CalendarDaysIcon, ClockIcon, DocumentTextIcon, FlagIcon, UserCircleIcon, XMarkIcon} from '@heroicons/react/24/outline';

import { formatDate } from '@/utils';
import type { Task, TaskDetail, TaskStatus } from '@/type';
import { statusConfig } from '@/lib/taskStatus';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import NotesPanel from '../notes/NotesPanel';


export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()

    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    
    const show = taskId ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    const { mutate, isPending } = useMutation({
        mutationFn: updateStatus,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ['task', taskId] })
            await queryClient.cancelQueries({ queryKey: ['project', projectId] })

            const previousTask = queryClient.getQueryData<TaskDetail>(['task', taskId])
            const previousProject = queryClient.getQueryData<{ tasks: Task[] }>(['project', projectId])

            queryClient.setQueryData<TaskDetail>(['task', taskId], (currentTask) => {
                if (!currentTask) return currentTask
                return { ...currentTask, status: variables.status }
            })

            queryClient.setQueryData<{ tasks: Task[] }>(['project', projectId], (currentProject) => {
                if (!currentProject) return currentProject

                return {
                    ...currentProject,
                    tasks: currentProject.tasks.map((task) =>
                        task._id === variables.taskId ? { ...task, status: variables.status } : task
                    ),
                }
            })

            return { previousTask, previousProject }
        },
        onError: (error, _variables, context) => {
            if (context?.previousTask) {
                queryClient.setQueryData<TaskDetail>(['task', taskId], context.previousTask)
            }

            if (context?.previousProject) {
                queryClient.setQueryData(['project', projectId], context.previousProject)
            }

            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate(location.pathname, { replace: true })
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        },
    })

    const handleChangeStatus = (status: TaskStatus) => {
        if (!taskId) return

        mutate({ projectId, taskId, status })
    }

    useEffect(() => {
        if (!isError) return

        const message = error instanceof Error ? error.message : 'Error al obtener la tarea.'
        toast.error(message)
        navigate(`/projects/${projectId}`, { replace: true })
    }, [isError, error, navigate, projectId])
  
    if ( isError ) {
        return null
    }

    if ( data ) {
        const status = statusConfig[data.status]

        return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname, {replace: true})}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="relative w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl shadow-azul-900/20">
                                    <div className="absolute -z-10 rounded-full -top-24 -right-20 size-72 bg-azul-200/50 blur-3xl" />
                                    <div className="absolute -z-10 rounded-full -bottom-24 -left-20 size-72 bg-verde-200/50 blur-3xl" />

                                    <div className="relative p-6 border-b border-gris-100 bg-gradient-to-r from-azul-50 via-white to-verde-50 md:p-8">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-3">
                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${status.badge}`}>
                                                    <FlagIcon className="mr-1.5 size-4" />
                                                    {status.label}
                                                </span>

                                                <DialogTitle
                                                    as="h3"
                                                    className="text-2xl font-black leading-tight text-gris-800 md:text-4xl"
                                                >
                                                    {data.name}
                                                </DialogTitle>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => navigate(location.pathname, { replace: true })}
                                                className="inline-flex items-center justify-center p-2 transition-colors duration-200 bg-white border rounded-xl border-gris-200 text-gris-500 hover:bg-gris-50 hover:text-gris-700"
                                                aria-label="Cerrar modal"
                                            >
                                                <XMarkIcon className="size-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative p-6 space-y-6 md:p-8">
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <div className="p-4 border rounded-2xl border-gris-200 bg-gris-50">
                                                <p className="text-xs font-bold tracking-wide uppercase text-gris-500">Agregada el</p>
                                                <p className="flex items-center gap-2 mt-2 text-sm font-semibold text-gris-700">
                                                    <CalendarDaysIcon className="size-4 text-azul-500" />
                                                    {formatDate(data.createdAt)}
                                                </p>
                                            </div>

                                            <div className="p-4 border rounded-2xl border-gris-200 bg-gris-50">
                                                <p className="text-xs font-bold tracking-wide uppercase text-gris-500">Ultima actualizacion</p>
                                                <p className="flex items-center gap-2 mt-2 text-sm font-semibold text-gris-700">
                                                    <ClockIcon className="size-4 text-verde-500" />
                                                    {formatDate(data.updatedAt)}
                                                </p>
                                            </div>
                                        </div>

                                        <section className="p-5 bg-white border rounded-2xl border-gris-200">
                                            <p className="mb-3 text-sm font-bold tracking-wide uppercase text-gris-500">Descripcion</p>
                                            <p className="flex items-start gap-3 text-base leading-relaxed text-gris-700">
                                                <DocumentTextIcon className="mt-0.5 size-5 shrink-0 text-azul-500" />
                                                <span>{data.description}</span>
                                            </p>
                                        </section>

                                        <div className="p-5 space-y-3 bg-white border rounded-2xl border-gris-200">
                                            {/* Estado actual */}
                                            <div className="flex items-center gap-3">
                                                <p className="text-xs font-bold tracking-wide uppercase text-gris-500 shrink-0">Estado actual</p>
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.badge}`}>
                                                    <span className={`inline-block size-2 rounded-full shrink-0 ${status.dot}`} />
                                                    {status.label}
                                                </span>
                                            </div>

                                            {/* Cambiar estado */}
                                            <div className="flex items-center gap-3">
                                                <p className="text-xs font-bold tracking-wide uppercase text-gris-500 shrink-0">Cambiar estado</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(Object.keys(statusConfig) as Task['status'][])
                                                        .filter((key) => key !== data.status)
                                                        .map((key) => {
                                                            const s = statusConfig[key]
                                                            return (
                                                                <button
                                                                    key={key}
                                                                    type="button"
                                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-opacity duration-150 hover:opacity-75 ${s.badge}`}
                                                                    onClick={() => handleChangeStatus(key)}
                                                                    disabled={isPending}
                                                                >
                                                                    <span className={`inline-block size-2 rounded-full shrink-0 ${s.dot}`} />
                                                                    {s.label}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Historial de cambios */}
                                        {data.completedBy.length > 0 && (
                                            <section className="p-5 bg-white border rounded-2xl border-gris-200">
                                                <p className="mb-4 text-sm font-bold tracking-wide uppercase text-gris-500">Historial de cambios</p>
                                                <ol className="relative ml-1 space-y-4 border-l-2 border-gris-200">
                                                    {[...data.completedBy].map((entry) => {
                                                        const s = statusConfig[entry.status]
                                                        return (
                                                            <li key={entry._id} className="ml-5">
                                                                <span className={`absolute -left-[9px] flex size-4 items-center justify-center rounded-full ring-2 ring-white ${s.dot}`} />
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${s.badge}`}>
                                                                        <ArrowRightIcon className="size-3" />
                                                                        {s.label}
                                                                    </span>
                                                                    <span className="inline-flex items-center gap-1 text-xs text-gris-500">
                                                                        <UserCircleIcon className="size-3.5" />
                                                                        {entry.user?.name ?? 'Usuario inactivo'}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ol>
                                            </section>
                                        )}
                                    </div>

                                    <NotesPanel notes={data.notes} projectId={projectId} taskId={taskId} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
    }

    return null
}