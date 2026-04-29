import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Heading } from "../Heading";
import { ErrorMessage } from "../ErrorMessage";
import { UpdateProfile } from "@/api/ProfileAPI";
import type { UserProfileFrom, UserType } from "@/type";

interface Props {
    data: UserType
}

export default function ProfileForm({ data }: Props) {
    
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileFrom>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: UpdateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
            navigate('/')
        }
    })

    const handleEditProfile = (formData: UserProfileFrom) => mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <Heading 
                    title="Mi Perfil"
                    subtitle="Aquí puedes actualizar tu información"
                />

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className="p-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg md:p-10"
                    noValidate
                >
                    <div className="space-y-2">
                        <label
                            className="block text-sm font-semibold text-gris-600"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                                errors.name
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                    : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                            }`}
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            className="block text-sm font-semibold text-gris-600"
                            htmlFor="email"
                        >E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Tu Email"
                            className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                                errors.email
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                    : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                            }`}
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                    />
                </form>
            </div>
        </>
    )
}