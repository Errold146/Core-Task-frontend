import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";

import type { TeamMember } from "@/type";
import { addUserToProject } from "@/api/TeamAPI";

interface Props {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({user, reset}: Props) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    const handleClick = () => {
        const data = { projectId, _id: user._id }
        mutate(data)
    }

    return (
        <div className="mt-10 space-y-4">
            <p className="text-xs font-bold tracking-widest uppercase text-gris-400">Resultado</p>

            <div className="flex items-center justify-between gap-4 p-4 border bg-gris-50 rounded-2xl border-gris-200">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full size-10 bg-azul-100">
                        <UserCircleIcon className="size-6 text-azul-600" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gris-800">{user.name}</p>
                        <p className="text-xs text-gris-400">{user.email}</p>
                    </div>
                </div>

                <button 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors duration-200 shadow-sm rounded-xl bg-verde-600 hover:bg-verde-700"
                    onClick={handleClick}
                >
                    <UserPlusIcon className="size-4" />
                    Agregar
                </button>
            </div>
        </div>
    )
}
