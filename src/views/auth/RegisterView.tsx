import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { AuthHeading, ErrorMessage } from "@/components";
import { createAccount } from "@/api/AuthAPI";
import type { UserRegistrationForm } from "@/type/index";

export default function RegisterView() {
    const navigate = useNavigate()
  
    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/confirm-account')
        }
    })

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

    return (
        <>
            <AuthHeading
                title="Crear Cuenta"
                description="Llena el formulario para"
                highlight="crear tu cuenta"
            />

            <form
                onSubmit={handleSubmit(handleRegister)}
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

                <div className="mb-2 space-y-2">
                    <label
                        className="block text-sm font-semibold text-gris-600"
                        htmlFor="name"
                    >Nombre</label>
                    <input
                        id="name"
                        type="name"
                        placeholder="Nombre de Registro"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.name
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-2 space-y-2">
                    <label
                        className="block text-sm font-semibold text-gris-600"
                        htmlFor="password"
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
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-2 space-y-2">
                    <label
                        className="block text-sm font-semibold text-gris-600"
                        htmlFor="password_confirmation"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.password_confirmation
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                />
            </form>

            <nav className="flex flex-col mt-6 space-y-4">
                <Link
                    to={'/auth/login'}
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
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