import { toast } from 'sonner';
import { Fragment } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

import type { Project } from "@/type";
import { ErrorMessage } from "../ErrorMessage";
import { checkPassword } from "@/api/ProfileAPI";
import { deleteProject } from "@/api/ProjectAPI";

export default function DeleteProjectModal() {
    const initialValues = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject') as Project['_id'];
    const show = !!deleteProjectId

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate: deleteProjectMutate } = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            reset()
            navigate(location.pathname, { replace: true })
        }
    })

    const { mutate: checkPasswordMutate } = useMutation({
        mutationFn: checkPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            deleteProjectMutate(deleteProjectId)
        }
    })

    const handleForm = (formData: { password: string }) => {
        checkPasswordMutate(formData)
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname, { replace: true })}>
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
                            <DialogPanel className="w-full max-w-lg p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl md:p-10">

                                <DialogTitle
                                    as="h3"
                                    className="text-2xl font-bold text-gris-900"
                                >Eliminar Proyecto</DialogTitle>

                                <p className="mt-2 text-sm text-gris-500">
                                    Confirma la eliminación del proyecto{' '}
                                    <span className="font-semibold text-red-600">ingresando tu password</span>
                                </p>

                                <form
                                    className="mt-6 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-semibold text-gris-600"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password de Inicio de Sesión"
                                            className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                                                errors.password
                                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                                    : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                                            }`}
                                            {...register("password", {
                                                required: "El password es obligatorio",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 bg-red-600 rounded-lg shadow cursor-pointer hover:bg-red-700"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}