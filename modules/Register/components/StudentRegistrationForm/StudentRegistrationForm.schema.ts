import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const StudentRegistrationSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    gender: z.enum(["Male", "Female"]),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    educationLevel: z.enum(["School", "College", "University"]),
    medium: z.enum(["Bangla", "English"]).optional(),
    class: z.string().optional(),
    degree: z.enum(["Bachelors", "Masters"]).optional(),
    degreeName: z.string().optional(),
    semesterYear: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TStudentRegistrationFormData = z.infer<typeof StudentRegistrationSchema>;
export const studentRegistrationSchemaResolver = zodResolver(StudentRegistrationSchema);
