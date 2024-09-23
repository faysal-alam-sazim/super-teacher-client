import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addAssignmentSchema = z.object({
  title: z.string().trim().min(1, "Title is required!"),
  description: z.string().trim().min(1, "Instruction is required"),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: "Due date cannot be in the past!",
  }),
  uploadFile: z.instanceof(File, { message: "File is required" }),
});

export const addAssignmentSchemaResolver = zodResolver(addAssignmentSchema);
