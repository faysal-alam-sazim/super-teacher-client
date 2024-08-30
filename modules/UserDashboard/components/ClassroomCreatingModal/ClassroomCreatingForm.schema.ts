import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createClassroomSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  subject: z.string().trim().min(1, "Subject is required"),
  classTime: z.string().trim().min(1, "Class time is required"),
  days: z.array(z.string().trim()).nonempty("At least one day is required"),
});

export const createClassroomFormResolver = zodResolver(createClassroomSchema);
