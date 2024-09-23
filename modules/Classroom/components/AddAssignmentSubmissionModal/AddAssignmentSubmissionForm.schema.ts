import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const submitAssignmentSchema = z.object({
  uploadFile: z.instanceof(File, { message: "File is required" }),
});

export const submitAssignmentSchemaResolver = zodResolver(submitAssignmentSchema);
