import * as z from "zod";

export const CreateUserFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display Name must be at least 2 characters.",
  }),
  closeApiKey: z.string().optional(),
  sheetId: z.string().optional(),
  googleAuthKey: z.string().optional(),
});

export type CreateUserFormValues = z.infer<typeof CreateUserFormSchema>;
