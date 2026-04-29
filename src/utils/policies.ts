import type { Project, TeamMember } from "@/type";

export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId