import z from "zod";

// Validation schema using Zod
const registerSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" })
}).refine((input) => input.password === input.confirmPassword, { 
    // Unless the confirm password matches the password, it will do this
    message: "Passwords do not match", path: ["confirmPassword"],
});

// Infer the TypeScript type from the Zod schema by default
type RegisterType = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterType };