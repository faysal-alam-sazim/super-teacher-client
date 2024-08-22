import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

const TeacherRegistrationSchema = z
  .object({
    uniqueCode: z.string().min(1, "Unique Code is required"),
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
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const teacherRegistrationSchemaResolver = zodResolver(TeacherRegistrationSchema);
