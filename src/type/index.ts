import { z } from "zod";

/** Auth */
const AuthSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
})

type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ConfirmToken = Pick<Auth, 'token'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

/** Users */
export const UserSchema = AuthSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type UserType = z.infer<typeof UserSchema>

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