import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addResourceSchema = z.object({
  title: z.string().trim().min(1, "Title is required!"),
  description: z.string().trim().min(1, "Instruction is required"),
  uploadFile: z.instanceof(File, { message: "File is required" }),
});

export const addResourceSchemaResolver = zodResolver(addResourceSchema);
