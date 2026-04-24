import { toast } from 'sonner';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClipboardDocumentCheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

import { TaskForm } from './TaskForm';
import { updateTask } from '@/api/TaskAPI';
import type { Project, Task, TaskFormData } from '@/type';
import { statusConfig } from '@/lib/taskStatus';

interface Props {
    data: Task
    taskId: Task['_id']
}

export function EditTaskModal({ data, taskId }: Props) {

    const { name, description } = data
    const status = statusConfig[data.status]

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()
    
    const { register, formState: { errors }, handleSubmit } = useForm<TaskFormData>({ defaultValues: { name, description } })
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ['task', taskId] })
            await queryClient.cancelQueries({ queryKey: ['project', projectId] })

            const previousTask = queryClient.getQueryData<Task>(['task', taskId])
            const previousProject = queryClient.getQueryData<Project>(['project', projectId])

            queryClient.setQueryData<Task>(['task', taskId], (currentTask) => {
                if (!currentTask) return currentTask

                return {
                    ...currentTask,
                    name: variables.formData.name,
                    description: variables.formData.description,
                    updatedAt: new Date().toISOString(),
                }
            })

            queryClient.setQueryData<Project>(['project', projectId], (currentProject) => {
                if (!currentProject) return currentProject

                return {
                    ...currentProject,
                    tasks: currentProject.tasks.map((task) =>
                        task._id === variables.taskId
                            ? {
                                ...task,
                                name: variables.formData.name,
                                description: variables.formData.description,
                                updatedAt: new Date().toISOString(),
                            }
                            : task
                    ),
                }
            })

            return { previousTask, previousProject }
        },
        onError: (error, _variables, context) => {
            if (context?.previousTask) {
                queryClient.setQueryData(['task', taskId], context.previousTask)
            }

            if (context?.previousProject) {
                queryClient.setQueryData(['project', projectId], context.previousProject)
            }

            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate(location.pathname, {replace: true})
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        },
    })


    const handleEditTasK = (formData: TaskFormData) => {
        const data = { projectId, taskId, formData }
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname, {replace: true}) }>
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
                                <div className="absolute rounded-full -top-24 -right-20 size-72 bg-azul-200/50 blur-3xl" />
                                <div className="absolute rounded-full -bottom-24 -left-20 size-72 bg-verde-200/40 blur-3xl" />

                                <div className="relative p-6 border-b border-gris-100 bg-gradient-to-r from-azul-50 via-white to-verde-50 md:p-8">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-3">
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full bg-verde-100 text-verde-700">
                                                <PencilSquareIcon className="mr-1.5 size-4" />
                                                Editar tarea
                                            </span>

                                            <DialogTitle
                                                as="h3"
                                                className="text-2xl font-black leading-tight text-gris-800 md:text-4xl"
                                            >
                                                Actualizar tarea
                                            </DialogTitle>

                                            <div>
                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${status.badge}`}>
                                                    <span className={`mr-1.5 inline-block size-2 rounded-full ${status.dot}`} />
                                                    {status.label}
                                                </span>
                                            </div>
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

                                <form
                                    className="relative p-6 space-y-4 md:p-8"
                                    onSubmit={handleSubmit(handleEditTasK)}
                                    noValidate
                                >
                                    <div className="p-5 bg-white border shadow-sm rounded-2xl border-gris-200">
                                        <div className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wide uppercase text-gris-500">
                                            <ClipboardDocumentCheckIcon className="size-5 text-verde-500" />
                                            Datos de la tarea
                                        </div>

                                        <TaskForm errors={errors} register={register} key={data._id} />
                                    </div>

                                    <button 
                                        type="submit"
                                        className="flex items-center justify-center w-full gap-2 p-3 font-bold text-white uppercase transition-colors duration-200 shadow rounded-xl bg-verde-600 hover:bg-verde-700"
                                    >
                                        <PencilSquareIcon className="size-6" />
                                        Guardar cambios
                                    </button>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}