import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

const editTeacherProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  gender: z.enum([EGender.MALE, EGender.FEMALE]),
  majorSubject: z.string().min(1, "Major Subject is required"),
  highestEducationLevel: z.enum([
    EHighestEducationLevel.BACHELORS,
    EHighestEducationLevel.MASTERS,
    EHighestEducationLevel.DIPLOMA,
    EHighestEducationLevel.PHD,
  ]),
  subjectsToTeach: z.array(z.string()).min(1, "Subjects to Teach is required"),
});

export const editTeacherProfileSchemaResolver = zodResolver(editTeacherProfileSchema);
