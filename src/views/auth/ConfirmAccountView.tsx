import { toast } from "sonner";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

import type { ConfirmToken } from "@/type";
import { confirmAccount } from "@/api/AuthAPI";

export default function ConfirmAccountView() {

    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [redirectToLogin, setRedirectToLogin] = useState(false)

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setRedirectToLogin(true)
        }
    })

    if (redirectToLogin) return <Navigate to='/auth/login' />

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate({token})

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="mt-5 text-2xl font-light text-white">
                Ingresa el código que recibiste {''}
                <span className="font-bold text-azul-500"> por Email</span>
            </p>

            <form
                className="p-10 mt-10 space-y-8 bg-white"
            >
                <label
                    className="block text-2xl font-semibold text-center"
                >Código de 6 dígitos</label>

                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-gris-300" />
                        <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-gris-300" />
                        <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-gris-300" />
                        <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-gris-300" />
                        <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-gris-300" />
                        <PinInputField className="w-10 h-10 p-3 placeholder-white border rounded-lg border-gris-300" />
                    </PinInput>
                </div>

            </form>

            <nav className="flex flex-col mt-10 space-y-4">
                <Link
                    to='/auth/new-code'
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    Solicitar un nuevo Código
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