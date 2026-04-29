import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ClipboardDocumentListIcon, UsersIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { Heading, Spinner } from "@/components";
import { getProjectById } from "@/api/ProjectAPI";
import { TasksList } from "@/components/tasks/TasksList";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { EditTaskData } from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useMemo } from "react";

export default function ProjectsDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId)
    })

    const canDelete = useMemo(() => data?.manager === user?._id, [data, user])

    if ( isLoading && authLoading ) return <Spinner centered />
    if ( isError ) return <Navigate to={'/404'} />

    if ( data && user ) return (
        <>

            <Heading
                title={`${data.projectName}`}
                subtitle={`${data.description}`}
            />

            <nav className="flex gap-3 my-5">
                <Link
                    to={'/'}
                    className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-azul-600 hover:bg-azul-700 text-white hover:shadow-azul-600/30 hover:scale-105"
                >
                    <ArrowLeftIcon className="size-5" />
                    Regresar
                </Link>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-verde-600 hover:bg-verde-700 text-white hover:shadow-verde-600/30 hover:scale-105"
                    onClick={() => navigate('?newTask=true')}
                >
                    <ClipboardDocumentListIcon className="size-5" />
                    Agregar Tarea
                </button>

                {isManager(data.manager, user._id) && (
                    <Link
                        to={'team'}
                        className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-gris-600 hover:bg-gris-700 text-white hover:shadow-gris-600/30 hover:scale-105"
                    >
                        <UsersIcon className="size-5" />
                        Equipo Trabajo
                    </Link>
                )}
            </nav>

            <TasksList tasks={data.tasks} canDelete={canDelete} />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
