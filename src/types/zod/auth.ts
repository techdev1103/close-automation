import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().nonempty("Password is required"),
});

export const RegisterFormSchema = LoginFormSchema.extend({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 2 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase character",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase character",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one numeric character",
    })
    .refine((value) => /\W|_/g.test(value), {
      message: "Password must contain at least one symbol character",
    }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
export type RegisterFormVaues = z.infer<typeof RegisterFormSchema>;
