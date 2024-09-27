import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editExamSchema = z.object({
  title: z.string().optional(),
  instruction: z.string().optional(),
  dueDate: z
    .date()
    .refine((date) => date >= new Date(), {
      message: "Due date cannot be in the past!",
    })
    .optional(),
});

export const editExamSchemaResolver = zodResolver(editExamSchema);
