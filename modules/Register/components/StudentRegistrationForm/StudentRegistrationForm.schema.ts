import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

const StudentRegistrationSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    gender: z.enum([EGender.MALE, EGender.FEMALE]),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone Number is required")
      .regex(
        /^\+880\d{9}$/,
        "Phone Number must start with +880 and contain exactly 9 digits after the country code",
      ),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    educationLevel: z.enum([
      EEducationLevel.SCHOOL,
      EEducationLevel.COLLEGE,
      EEducationLevel.UNIVERSITY,
    ]),
    medium: z.enum([EMedium.BANGLA, EMedium.ENGLISH]).optional(),
    class: z.string().optional(),
    degree: z.enum([EDegree.BACHELORS, EDegree.MASTERS]).optional(),
    degreeName: z.string().optional(),
    semesterYear: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (
      data.educationLevel === EEducationLevel.SCHOOL ||
      data.educationLevel === EEducationLevel.COLLEGE
    ) {
      if (!data.medium) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Medium is required",
          path: ["medium"],
        });
      }
      if (!data.class) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Class is required",
          path: ["class"],
        });
      }
    }

    if (data.educationLevel === EEducationLevel.UNIVERSITY) {
      if (!data.degree) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree is required",
          path: ["degree"],
        });
      }
      if (!data.degreeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree Name is required",
          path: ["degreeName"],
        });
      }
      if (!data.semesterYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Semester/Year is required",
          path: ["semesterYear"],
        });
      }
    }
  });

export const studentRegistrationSchemaResolver = zodResolver(StudentRegistrationSchema);
