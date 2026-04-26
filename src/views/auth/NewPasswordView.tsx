import { useState } from "react";

import { AuthHeading } from "@/components";
import NewPasswordForm from '@/components/auth/NewPasswordForm';
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import type { ConfirmToken } from "@/type";

export default function NewPasswordView() {

    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <AuthHeading 
                title="Restablecer Contraseña"
                description="Ingresa el código que resiviste"
                highlight="por tu Email"
            />   

            {!isValidToken ? 
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> : 
                <NewPasswordForm  token={token} />
            }
        </>
    )
}
