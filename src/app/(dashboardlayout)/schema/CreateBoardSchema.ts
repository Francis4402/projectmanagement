import { z } from "zod";

export const CreateBoardSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    startDate: z.string(),
    endDate: z.string(),
    teamId: z.string(),
})