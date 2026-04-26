import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { forgotPassword } from "@/api/AuthAPI";
import type { ForgotPasswordForm } from "@/type";
import { AuthHeading, ErrorMessage } from "@/components";

export default function ForgotPasswordView() {

    const navigate = useNavigate()
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/new-password')
        }
    })
    
    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


    return (
        <>
            <AuthHeading
                title="Restablecer Contraseña"
                description="Ingresa tu email para"
                highlight="restablecer tu contraseña"
            />

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="p-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg md:p-10"
                noValidate
            >
                <div className="mb-2 space-y-2">
                    <label
                        className="block text-sm font-semibold text-gris-600"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.email
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
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
                    value='Enviar Instrucciones'
                    className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                />
            </form>

            <nav className="flex flex-col mt-6 space-y-4">
                <Link
                    to='/auth/login'
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to='/auth/register'
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    ¿No tienes cuenta? Crea Cuenta
                </Link>
            </nav>
        </>
    )
}