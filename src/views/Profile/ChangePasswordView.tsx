import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type { UpdatePasswordForm } from "@/type";
import { ChangePassword } from "@/api/ProfileAPI";
import { ErrorMessage, Heading } from "@/components";

export default function ChangePasswordView() {
    
    const initialValues: UpdatePasswordForm = {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { mutate } = useMutation({
        mutationFn: ChangePassword,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })
    
    const password = watch('password');
    const handleChangePassword = (formData: UpdatePasswordForm) => mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">

                <Heading 
                    title="Cambiar Contraseña"
                    subtitle="Utiliza este formulario para cambiar tu contraseña"
                />

                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className="p-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg md:p-10"
                    noValidate
                >
                    <div className="space-y-2">
                        <label
                            className="block text-sm font-semibold text-gris-600"
                            htmlFor="current_password"
                        >Contraseña Actual</label>
                        <input
                            id="current_password"
                            type="password"
                            placeholder="Contraseña Actual"
                            className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                                errors.current_password
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                    : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                            }`}
                            {...register("current_password", {
                                required: "La Contraseña actual es obligatoria.",
                            })}
                        />
                        {errors.current_password && (
                            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            className="block text-sm font-semibold text-gris-600"
                            htmlFor="password"
                        >Nueva Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nueva Contraseña"
                            className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                                errors.password
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                    : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                            }`}
                            {...register("password", {
                                required: "La Nueva Contraseña es obligatoria.",
                                minLength: {
                                    value: 8,
                                    message: 'La Contraseña debe ser mínimo de 8 caracteres'
                                }
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-semibold text-gris-600"
                        >Repetir Contraseña</label>

                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repetir Contraseña"
                            className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                                errors.password_confirmation
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                    : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                            }`}
                            {...register("password_confirmation", {
                                required: "Repetir la Contraseña es requerido.",
                                validate: value => value === password || 'Los Contraseñas no son iguales.'
                            })}
                        />
                        {errors.password_confirmation && (
                            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Cambiar Contraseña'
                        className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                    />
                </form>
            </div>
        </>
    )
}