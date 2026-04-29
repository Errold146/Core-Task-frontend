import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { UpdatePasswordForm, UserProfileFrom } from "@/type";

export async function UpdateProfile(formData: UserProfileFrom) {
    try {
        const url = '/auth/profile'
        const { data } = await api.put<string>(url, formData)
        return data
        
    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function ChangePassword(formData: UpdatePasswordForm) {
    try {
        const url = '/auth/update-password'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function checkPassword(formData: { password: string }) {
    try {
        const url = '/auth/check-password'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}