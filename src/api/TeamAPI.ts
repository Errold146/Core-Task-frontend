import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TeamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from '../type/index';

export async function findUserByEmail({projectId, formData}: {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        return data
        
    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function addUserToProject({projectId, _id}: {projectId: Project['_id'], _id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post<string>(url, {_id})
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const res = TeamMembersSchema.safeParse(data)
        if ( res.success ) {
            return res.data
        }

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function deleteUserFromProject({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function leaveProject(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team/leave`
        const { data } = await api.post<string>(url)
        return data

    } catch (error) {
        if ( isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}