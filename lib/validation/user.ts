import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
});