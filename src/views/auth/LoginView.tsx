import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "@/api/AuthAPI";
import type { UserLoginForm } from "@/type";
import { AuthHeading, ErrorMessage } from "@/components";

export default function LoginView() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: loginUser,
        onError: (error) => {
            toast.error(error.message)
            if (error.message.toLowerCase().includes('no ha sido confirmada')) {
                navigate('/auth/confirm-account')
            }
        },
        onSuccess: async () => {
            await queryClient.resetQueries({ queryKey: ['user'] })
            toast.success('Sesión Iniciada Correctamente.')
            reset()
            navigate('/')
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <AuthHeading
                title="Iniciar Sesión"
                description="Llena el formulario para"
                highlight="iniciar sesión"
            />

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="p-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg md:p-10"
                noValidate
            >
                
                <div className="mb-2 space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gris-600"
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
                            required: "El Email es obligatorio",
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

                <div className="mb-2 space-y-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gris-600"
                    >Password</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.password
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                />
            </form>

            <nav className="flex flex-col mt-6 space-y-4">
                <Link
                    to={'/auth/register'}
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    ¿No tienes cuenta? Crear Cuenta
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}