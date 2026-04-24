import { toast } from "sonner";
import { Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, Transition, MenuItem, MenuItems } from "@headlessui/react";

import type { Task } from "@/type";
import { deleteTask } from "@/api/TaskAPI";
import { statusConfig } from "@/lib/taskStatus";

interface Props {
    task: Task;
}

export function TaskCard({ task }: Props) {
    
    const config = statusConfig[task.status];
    
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const projectId = params.projectId!

    const openTaskDetails = () => {
        navigate(location.pathname + `?viewTask=${task._id}`)
    }

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            toast.success(data)
        }
    })

    return (
        <li
            className={`group relative z-0 flex items-center justify-between gap-4 rounded-xl border border-gris-200 border-l-4 ${config.borderColor} bg-white p-5 shadow-sm transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-gris-300 hover:shadow-lg hover:shadow-azul-500/10 focus-within:z-20`}
        >
            <div className="flex flex-col flex-1 min-w-0 gap-2">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={openTaskDetails}
                        className="truncate text-left text-base font-bold text-gris-800 transition-colors duration-300 hover:text-azul-700 hover:underline hover:underline-offset-4"
                    >
                        {task.name}
                    </button>
                    <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.badge}`}>
                        {config.label}
                    </span>
                </div>

                <p className="text-sm leading-relaxed text-gris-500 line-clamp-2 min-h-[2.75rem]">
                    {task.description}
                </p>
            </div>

            <div className="flex items-center shrink-0">
                <Menu as="div" className="relative">
                    <MenuButton className="grid p-2 transition-all duration-200 rounded-lg place-items-center text-gris-400 hover:bg-gris-100 hover:text-gris-700 focus:outline-none">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
                    </MenuButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 scale-90 -translate-y-1"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-90 -translate-y-1"
                    >
                        <MenuItems className="absolute right-0 z-40 mt-2 w-48 origin-top-right divide-y divide-gris-100 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-gris-200 focus:outline-none">
                            <div className="space-y-0.5 pb-1">
                                <MenuItem>
                                    {({ focus }) => (
                                        <button
                                            type="button"
                                            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${focus ? "bg-azul-50 text-azul-700" : "text-gris-700"}`}
                                            onClick={openTaskDetails}
                                        >
                                            <EyeIcon className="size-4" />
                                            Ver Tarea
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <button
                                            type="button"
                                            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${focus ? "bg-verde-50 text-verde-700" : "text-gris-700"}`}
                                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                                        >
                                            <PencilSquareIcon className="size-4" />
                                            Editar Tarea
                                        </button>
                                    )}
                                </MenuItem>
                            </div>

                            <div className="pt-1">
                                <MenuItem>
                                    {({ focus }) => (
                                        <button
                                            type="button"
                                            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${focus ? "bg-red-50 text-red-600" : "text-red-500"}`}
                                            onClick={() => mutate({projectId, taskId: task._id})}
                                        >
                                            <TrashIcon className="size-4" />
                                            Eliminar Tarea
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </li>
    );
}
