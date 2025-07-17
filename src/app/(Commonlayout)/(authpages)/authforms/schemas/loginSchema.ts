import { email, z } from "zod";

export const loginSchema = z.object({
    email: email().min(4, {
        message: "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Please enter your password"
    }),
})