import z from "zod";

// Validation schema using Zod
const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" })
});

// Infer the TypeScript type from the Zod schema by default
type LoginType = z.infer<typeof LoginSchema>;

export { LoginSchema, type LoginType };