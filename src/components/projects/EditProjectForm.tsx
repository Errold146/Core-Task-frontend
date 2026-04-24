import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Heading } from "../Heading";
import { ProjectForm } from "./ProjectForm";
import { updateProject } from "@/api/ProjectAPI";
import type { Project, ProjectFormData } from "@/type";

interface Props {
    data: ProjectFormData
    projectId: Project['_id']
}

export function EditProjectForm({data, projectId}: Props) {

    const navigate = useNavigate()
    const { projectName, clientName, description } = data

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectName,
            clientName,
            description
        }
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }

        mutate(data)
    }

    return (
         <>
            <div className="max-w-3xl mx-auto">
                <Heading
                    title="Editar Proyecto"
                    subtitle="Llena el siguente formulario para editar el proyecto"
                />

                <nav className="my-5">
                    <Link
                        to={'/'}
                        className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-azul-600 hover:bg-azul-700 text-white hover:shadow-azul-600/30 hover:scale-105"
                    >
                        <ArrowLeftIcon className="size-5" />
                        Inicio
                    </Link>
                </nav>

                <form
                    className="p-10 mt-10 bg-white rounded-lg shadow-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm register={register} errors={errors} />

                    <button 
                        type="submit"
                        className="flex items-center justify-center w-full gap-2 p-3 font-bold uppercase transition-colors duration-200 rounded-lg shadow bg-azul-600 hover:bg-azul-700 text-azul-50"
                    >
                        <PencilSquareIcon className="size-6" />
                        Editar Proyecto
                    </button>
                </form>
            </div>
        </>
    )
}
