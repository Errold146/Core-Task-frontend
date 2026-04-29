import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import type { TeamMemberForm } from "@/type";
import { ErrorMessage } from "../ErrorMessage";
import { findUserByEmail } from "@/api/TeamAPI";
import { Spinner } from "../Spinner";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData }
        mutation.mutate(data)
    }

    const resetData = () => {
        reset()
        mutation.reset()
    }

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="mb-6 space-y-2">
                    <label
                        className="block text-sm font-semibold text-gris-600"
                        htmlFor="name"
                    >Email de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Email del usuario a Agregar"
                        className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                            errors.email
                                ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                                : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                        }`}
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center w-full gap-2 p-3 font-bold uppercase transition-colors duration-200 shadow rounded-xl bg-azul-600 text-azul-50 hover:bg-azul-700"
                >
                    Buscar Usuario
                </button>
            </form>
            
            <div className="mt-10">
                {mutation.isPending && <Spinner />}
                {mutation.error && <p className="text-xl font-semibold text-center text-red-600">{mutation.error.message}</p>}
                {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
            </div>
        </>
    )
}