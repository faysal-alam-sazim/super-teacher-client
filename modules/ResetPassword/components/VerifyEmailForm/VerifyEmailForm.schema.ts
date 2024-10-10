import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const verifyEmailFormSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export const verifyEmailFormSchemaResolver = zodResolver(verifyEmailFormSchema);
