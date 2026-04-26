import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

import type { ConfirmToken } from '@/type';
import { validateToken } from '@/api/AuthAPI';

interface Props {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: Props) {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })
    
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }
    
    const handleComplete = (token: ConfirmToken['token']) => mutate({token})

    return (
        <>
            <form
                className="p-8 mt-6 space-y-6 bg-white rounded-lg shadow-lg md:p-10"
            >
                <label
                    className="block text-sm font-semibold text-center text-gris-600"
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
            <nav className="flex flex-col mt-6 space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="font-semibold text-center text-verde-700 hover:text-verde-500"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}