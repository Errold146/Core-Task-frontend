import AddNotesForm from "./AddNotesForm";
import NotesList from "./NotesList";
import type { Note, Project, Task } from "@/type";

type NotesPanelProps = {
    notes: Note[]
    projectId: Project['_id']
    taskId: Task['_id']
}

export default function NotesPanel({ notes, projectId, taskId }: NotesPanelProps) {
    return (
        <div className="relative p-6 border-t border-gris-100 md:p-8">
            <p className="mb-4 text-sm font-bold tracking-wide uppercase text-gris-500">Notas</p>
            <AddNotesForm key={notes.length} projectId={projectId} taskId={taskId} />
            <NotesList notes={notes} projectId={projectId} taskId={taskId} />
        </div>
    )
}

