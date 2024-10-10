import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const updatePasswordFormSchema = z
  .object({
    newPassword: z.string().trim().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updatePasswordFormSchemaResolver = zodResolver(updatePasswordFormSchema);
