import type { Task } from "@/type";

interface StatusStyle {
    label: string;
    borderColor: string;
    badge: string;
    headerBg: string;
    headerText: string;
    dot: string;
}

export const statusConfig: Record<Task["status"], StatusStyle> = {
    pending: {
        label: "Pendiente",
        borderColor: "border-l-gris-400",
        badge: "bg-gris-200 text-gris-700",
        headerBg: "bg-gris-100",
        headerText: "text-gris-700",
        dot: "bg-gris-400",
    },
    onHold: {
        label: "En Espera",
        borderColor: "border-l-amber-400",
        badge: "bg-amber-100 text-amber-700",
        headerBg: "bg-amber-50",
        headerText: "text-amber-700",
        dot: "bg-amber-400",
    },
    inProgress: {
        label: "En Progreso",
        borderColor: "border-l-azul-500",
        badge: "bg-azul-100 text-azul-700",
        headerBg: "bg-azul-50",
        headerText: "text-azul-700",
        dot: "bg-azul-500",
    },
    underReview: {
        label: "En Revisión",
        borderColor: "border-l-violet-500",
        badge: "bg-violet-100 text-violet-700",
        headerBg: "bg-violet-50",
        headerText: "text-violet-700",
        dot: "bg-violet-500",
    },
    completed: {
        label: "Completada",
        borderColor: "border-l-verde-500",
        badge: "bg-verde-100 text-verde-700",
        headerBg: "bg-verde-50",
        headerText: "text-verde-700",
        dot: "bg-verde-500",
    },
};
