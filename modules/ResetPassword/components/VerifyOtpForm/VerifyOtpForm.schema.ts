import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const verifyOtpSchema = z.object({
  otp: z.string().trim().length(6, "OTP length should be 6"),
});

export const verifyOtpSchemaResolver = zodResolver(verifyOtpSchema);
