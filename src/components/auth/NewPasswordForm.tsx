import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ErrorMessage } from "@/components";
import { updatePassword } from "@/api/AuthAPI";
import type { ConfirmToken, NewPasswordForm } from "@/type";

interface Props {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: Props) {
    
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ 
        defaultValues: initialValues 
    })

    const { mutate } = useMutation({
        mutationFn: updatePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="p-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg md:p-10"
                noValidate
            >
                <div className="mb-2 space-y-2">
                    <label
                        className="block text-sm font-semibold text-gris-600"
                    >Contraseña</label>

                    <input
                        type="password"
                        placeholder="Contraseña de Registro"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.password
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("password", {
                            required: "La Contraseña es obligatoria",
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

                <div className="mb-2 space-y-2">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-semibold text-gris-600"
                    >Repetir Contraseña</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite la Contraseña de Registro"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.password_confirmation
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("password_confirmation", {
                            required: "Repetir la Contraseña es obligatorio",
                            validate: value => value === password || 'Las Contraseñas no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Actualizar Contraseña'
                    className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                />
            </form>
        </>
    )
}