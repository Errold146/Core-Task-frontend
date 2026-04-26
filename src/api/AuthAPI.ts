import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, UserType } from '../type';

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN_CORETASK', data)
    
    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function newConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

interface UpdatePass {
    formData: NewPasswordForm
    token: ConfirmToken['token']
}

export async function updatePassword({ formData, token }: UpdatePass) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api<UserType>('/auth/user')
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}
