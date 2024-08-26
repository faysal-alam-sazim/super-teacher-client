import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const loginFormSchemaResolver = zodResolver(LoginFormSchema);
