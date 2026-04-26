import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthHeading, ErrorMessage } from "@/components";
import type { RequestConfirmationCodeForm } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { newConfirmationCode } from "@/api/AuthAPI";
import { toast } from "sonner";

export default function NewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: newConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    return (
        <>
            <AuthHeading
                title="Solicitar Código de Confirmación"
                description="Coloca tu Email para recibir"
                highlight="un nuevo código"
            />

            <form
                onSubmit={handleSubmit(handleRequestCode)}
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
                    value='Enviar Código'
                    className="w-full p-3 font-bold text-white uppercase transition-colors duration-200 rounded-lg shadow cursor-pointer bg-azul-600 hover:bg-azul-700"
                />
            </form>

            <nav className="flex flex-col mt-6 space-y-3 sm:mt-8">
                <Link
                    to='/auth/login'
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