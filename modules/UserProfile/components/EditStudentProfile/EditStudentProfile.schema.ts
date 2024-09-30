import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

const editStudenProfileSchema = z
  .object({
    firstName: z.string().trim().min(1, "First Name is required"),
    lastName: z.string().trim().min(1, "Last Name is required"),
    gender: z.enum([EGender.MALE, EGender.FEMALE]),
    address: z.string().trim().min(1, "Address is required"),
    phoneNumber: z.string().trim().min(1, "Phone Number is required"),
    educationLevel: z.enum([
      EEducationLevel.SCHOOL,
      EEducationLevel.COLLEGE,
      EEducationLevel.UNIVERSITY,
    ]),
    medium: z.enum([EMedium.BANGLA, EMedium.ENGLISH]).optional().or(z.literal("")),
    class: z.string().optional().or(z.literal("")),
    degree: z.enum([EDegree.BACHELORS, EDegree.MASTERS]).optional().or(z.literal("")),
    degreeName: z.string().optional().or(z.literal("")),
    semesterYear: z.string().optional().or(z.literal("")),
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
      if (!data.class || data.class === "") {
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
      if (!data.degreeName || data.degreeName === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree Name is required",
          path: ["degreeName"],
        });
      }
      if (!data.semesterYear || data.semesterYear === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Semester/Year is required",
          path: ["semesterYear"],
        });
      }
    }
  });

export const editStudenProfileSchemaResolver = zodResolver(editStudenProfileSchema);
