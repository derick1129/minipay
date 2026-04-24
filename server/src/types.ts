import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6)
})

export const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const updateUserSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    password: z.string().min(6).optional
})

export const transferSchema = z.object({
    to: z.string(),
    amount: z.number().positive()
})