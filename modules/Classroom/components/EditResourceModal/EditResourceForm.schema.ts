import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editResourceSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  uploadFile: z.instanceof(File).optional(),
});

export const editResourceSchemaResolver = zodResolver(editResourceSchema);
