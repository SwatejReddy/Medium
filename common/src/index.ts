import z from 'zod';

//signupInput
export const signupInput = z.object({
    username: z.string(),
    password: z.string().min(6),
    name: z.string()
})
export type signupInput = z.infer<typeof signupInput>


//singinInput
export const singinInput = z.object({
    username: z.string(),
    password: z.string().min(6)
})
export type singinInput = z.infer<typeof singinInput>


//createBlogInput
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export type createBlogInput = z.infer<typeof createBlogInput>


//updateBlogInput
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})
export type updateBlogInput = z.infer<typeof updateBlogInput>