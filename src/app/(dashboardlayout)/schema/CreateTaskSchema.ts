import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.string().optional(),
    priority: z.string(),
    tags: z.array(z.string().min(1)),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
    points: z.number().optional(),
    authorUserId: z.number(),
    assignedUserId: z.number().optional(),
    projectId: z.number(),
})