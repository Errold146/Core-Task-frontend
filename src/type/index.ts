import { z } from "zod";

/** Auth */
const AuthSchema = z.object({
    name: z.string(),
    email: z.email(),
    current_password: z.string(),
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
export type UpdatePasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>

/** Users */
export const UserSchema = AuthSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type UserType = z.infer<typeof UserSchema>
export type UserProfileFrom = Pick<UserType, 'email' | 'name'>

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

export const TaskDetailSchema = TaskSchema.extend({
    completedBy: z.array(
        z.object({
            _id: z.string(),
            user: z.object({
                _id: z.string(),
                name: z.string()
            }).nullable(),
            status: TaskStatusSchema
        })
    ).default([]),
    notes: z.array(
        z.object({
            _id: z.string(),
            content: z.string(),
            createdBy: z.object({
                _id: z.string(),
                name: z.string(),
                email: z.string()
            }).nullable(),
            task: z.string(),
            createdAt: z.string(),
            updatedAt: z.string()
        })
    ).default([])
})

export type Task = z.infer<typeof TaskSchema>
export type TaskDetail = z.infer<typeof TaskDetailSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Notes */
export type Note = TaskDetail['notes'][number]
export type NoteFormData = Pick<Note, 'content'>

/** Projects */
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema),
    manager: z.string()
})

export const DasboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

/** Team */
const TeamMemberSchema = UserSchema.pick({
    _id: true,
    name: true,
    email: true
})

export const TeamMembersSchema = z.array(TeamMemberSchema)

export type TeamMember = z.infer<typeof TeamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>