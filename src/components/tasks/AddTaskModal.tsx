import { toast } from 'sonner';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardDocumentListIcon, PlusIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

import { TaskForm } from './TaskForm';
import type { Project, Task, TaskFormData } from '@/type';
import { createTask } from '@/api/TaskAPI';

export function AddTaskModal() {

    const navigate = useNavigate()

    /** Leer si modal existe */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false

    /** Obtener el projectId de la url */
    const params = useParams()
    const projectId = params.projectId!

    const initialValues: TaskFormData = {
        name: '',
        description: ''
    }
    const { register, formState: { errors }, reset, handleSubmit } = useForm<TaskFormData>({
        defaultValues: initialValues
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createTask,
        onMutate: async ({ formData }) => {
            await queryClient.cancelQueries({ queryKey: ['project', projectId] })

            const previousProject = queryClient.getQueryData<Project>(['project', projectId])

            queryClient.setQueryData<Project>(['project', projectId], (currentProject) => {
                if (!currentProject) return currentProject

                const optimisticTask: Task = {
                    _id: `temp-${Date.now()}`,
                    name: formData.name,
                    description: formData.description,
                    project: projectId,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }

                return {
                    ...currentProject,
                    tasks: [...currentProject.tasks, optimisticTask],
                }
            })

            return { previousProject }
        },
        onError: (error, _variables, context) => {
            if (context?.previousProject) {
                queryClient.setQueryData(['project', projectId], context.previousProject)
            }

            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
        }
    })

    const handleForm = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
        
    }

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
                                    <div className="absolute rounded-full -top-24 -right-20 size-72 bg-azul-200/50 blur-3xl" />
                                    <div className="absolute rounded-full -bottom-24 -left-20 size-72 bg-verde-200/40 blur-3xl" />

                                    <div className="relative p-6 border-b border-gris-100 bg-gradient-to-r from-azul-50 via-white to-verde-50 md:p-8">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-3">
                                                <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full bg-azul-100 text-azul-700">
                                                    <SparklesIcon className="mr-1.5 size-4" />
                                                    Nueva tarea
                                                </span>

                                                <DialogTitle
                                                    as="h3"
                                                    className="text-2xl font-black leading-tight text-gris-800 md:text-4xl"
                                                >
                                                    Crear tarea
                                                </DialogTitle>

                                                <p className="text-sm font-medium text-gris-500 md:text-base">
                                                    Completa el formulario para agregar una nueva tarea al proyecto.
                                                </p>
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
                                        onSubmit={handleSubmit(handleForm)}
                                        noValidate
                                    >
                                        <div className="p-5 bg-white border shadow-sm rounded-2xl border-gris-200">
                                            <div className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wide uppercase text-gris-500">
                                                <ClipboardDocumentListIcon className="size-5 text-azul-500" />
                                                Datos de la tarea
                                            </div>

                                            <TaskForm errors={errors} register={register} />
                                        </div>

                                        <button 
                                            type="submit"
                                            className="flex items-center justify-center w-full gap-2 p-3 font-bold uppercase transition-colors duration-200 shadow rounded-xl bg-azul-600 text-azul-50 hover:bg-azul-700"
                                        >
                                            <PlusIcon className="size-6" />
                                            Crear tarea
                                        </button>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}