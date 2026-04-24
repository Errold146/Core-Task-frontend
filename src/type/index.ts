import { z } from "zod";

/** Tasks */
export const TaskStatusSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export type TaskStatus = z.infer<typeof TaskStatusSchema>

export const TaskSchema  = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Task = z.infer<typeof TaskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Projects */
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema),
})

export const dasboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>