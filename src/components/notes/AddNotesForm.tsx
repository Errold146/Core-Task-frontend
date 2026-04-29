import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/api/NoteAPI';
import type { NoteFormData, Project, Task } from '@/type';
import { ErrorMessage } from '../ErrorMessage';

type AddNotesFormProps = {
    projectId: Project['_id']
    taskId: Task['_id']
}

export default function AddNotesForm({ projectId, taskId }: AddNotesFormProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<NoteFormData>({ defaultValues: { content: '' } })
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            reset({ content: '' })
        },
        onError: (error) => {
            toast.error(error.message || 'Error al crear la nota')
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ projectId, taskId, formData })
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="space-y-2">
                <label
                    htmlFor="content"
                    className="block text-sm font-semibold text-gris-600"
                >
                    Agregar nota
                </label>
                <input
                    id="content"
                    type="text"
                    placeholder="Escribe el contenido de la nota..."
                    className={`w-full p-3 rounded-lg border bg-gris-50 placeholder:text-gris-400 transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                        errors.content
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-300'
                            : 'border-gris-200 focus:border-azul-500 focus:ring-azul-300'
                    }`}
                    {...register('content', { required: 'El contenido de la nota es requerido' })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm text-white transition-all duration-200 rounded-xl cursor-pointer bg-azul-600 hover:bg-azul-500 shadow-sm hover:shadow-azul-600/30 hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
                <PlusIcon className="size-4" />
                Crear Nota
            </button>
        </form>
    )
}
