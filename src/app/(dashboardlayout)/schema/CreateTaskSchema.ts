import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    tags: z.array(z.string().min(1)).optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    points: z.string().optional(),
    authorUserId: z.string(),
    assignedUserId: z.string().optional(),
    projectId: z.string(),
})