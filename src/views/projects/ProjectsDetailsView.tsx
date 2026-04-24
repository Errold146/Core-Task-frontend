import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { Heading, Spinner } from "@/components";
import { getProjectById } from "@/api/ProjectAPI";
import { TasksList } from "@/components/tasks/TasksList";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { EditTaskData } from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";

export default function ProjectsDetailsView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId)
    })

    if ( isLoading ) return <Spinner centered />
    if ( isError ) return <Navigate to={'/404'} />

    if ( data ) return (
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
            </nav>

            <TasksList tasks={data.tasks} />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
