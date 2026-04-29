import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { formatDate } from '@/utils';
import { useAuth } from '@/hooks/useAuth';
import { deleteNote } from '@/api/NoteAPI';
import type { Note, Project, Task } from '@/type';

type NotesListProps = {
    notes: Note[]
    projectId: Project['_id']
    taskId: Task['_id']
}

export default function NotesList({ notes, projectId, taskId }: NotesListProps) {

    const { data: user } = useAuth()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if (notes.length === 0) return (
        <p className="py-6 text-sm text-center text-gris-400">No hay notas aún. Sé el primero en agregar una.</p>
    )

    return (
        <ul className="mt-5 space-y-3">
            {notes.map(note => (
                <li
                    key={note._id}
                    className="flex items-start justify-between gap-3 p-3 border rounded-xl bg-gris-50 border-gris-200"
                >
                    <div className="min-w-0 space-y-1">
                        <p className="text-sm break-words text-gris-700">{note.content}</p>
                        <p className="inline-flex items-center gap-1 text-xs text-gris-400">
                            <UserCircleIcon className="size-3.5 shrink-0" />
                            <span className="font-medium text-gris-500">{note.createdBy?.name ?? 'Usuario inactivo'}</span>
                            <span className="mx-0.5">·</span>
                            {formatDate(note.createdAt)}
                        </p>
                    </div>

                    {note.createdBy && user?._id === note.createdBy._id && (
                        <button
                            type="button"
                            onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                            className="p-1.5 transition-colors duration-200 rounded-lg shrink-0 text-gris-400 hover:text-red-500 hover:bg-red-50"
                            aria-label="Eliminar nota"
                        >
                            <TrashIcon className="size-5" />
                        </button>
                    )}
                </li>
            ))}
        </ul>
    )
}
