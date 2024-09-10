import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const EnrollStudentSchema = z.object({
  student: z.string().min(1, "You must select a student name"),
});

export const EnrollStudentSchemaResolver = zodResolver(EnrollStudentSchema);
