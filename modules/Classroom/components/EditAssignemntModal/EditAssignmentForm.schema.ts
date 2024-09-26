import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editAssignmentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z
    .date()
    .refine((date) => date >= new Date(), {
      message: "Due date cannot be in the past!",
    })
    .optional(),
  uploadFile: z.instanceof(File).optional(),
});

export const editAssignmentSchemaResolver = zodResolver(editAssignmentSchema);
