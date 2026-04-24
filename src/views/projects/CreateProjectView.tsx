import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";


import type { ProjectFormData } from "@/type";
import { createProject } from "@/api/ProjectAPI";
import { Heading, ProjectForm } from "@/components";

export default function CreateProjectView() {

    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (data: ProjectFormData) => mutate(data)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <Heading
                    title="Crear Proyecto"
                    subtitle="Llena el siguente formulario para crear un proyecto"
                />

                <nav className="my-5">
                    <Link
                        to={'/'}
                        className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-azul-600 hover:bg-azul-700 text-white hover:shadow-azul-600/30 hover:scale-105"
                    >
                        <ArrowLeftIcon className="size-5" />
                        Regresar
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
                        <PlusIcon className="size-6" />
                        Crear Proyecto
                    </button>
                </form>
            </div>
        </>
    )
}
