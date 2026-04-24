import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import type { TaskFormData } from "@/type";
import { ErrorMessage } from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="mb-6 space-y-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gris-600"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                        errors.name
                            ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                            : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                    }`}
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-6 space-y-2">
                <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gris-600"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 resize-none h-32 ${
                        errors.description
                            ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                            : "border-gris-200 focus:border-azul-500 focus:ring-azul-300"
                    }`}
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}