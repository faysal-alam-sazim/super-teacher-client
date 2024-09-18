import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createExamSchema = z.object({
  title: z.string().trim().min(1, "Title is required!"),
  instruction: z.string().trim().min(1, "Instruction is required"),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: "Due date cannot be in the past!",
  }),
});

export const createExamSchemaResolver = zodResolver(createExamSchema);
