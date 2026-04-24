import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import type { ProjectFormData } from "type";

interface Props {
    register:  UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export function ProjectForm({ register, errors }: Props) {
    return (
        <>
            <div className="mb-6 space-y-2">
                <label htmlFor="projectName" className="block text-sm font-semibold text-gris-600">
                    Nombre del Proyecto
                </label>
                <input
                    id="projectName"
                    className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                        errors.projectName
                            ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                            : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                    }`}
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es requrido.",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-6 space-y-2">
                <label htmlFor="clientName" className="block text-sm font-semibold text-gris-600">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                        errors.clientName
                            ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                            : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                    }`}
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es requrido.",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-6 space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gris-600">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 resize-none h-32 ${
                        errors.description
                            ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                            : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                    }`}
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "La descripción del proyecto es requerida."
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}