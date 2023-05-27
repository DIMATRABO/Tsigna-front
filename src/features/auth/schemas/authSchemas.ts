import { object, string, z, date } from "zod";

export const signupSchema = object({
  email: string({
    required_error: "Email is required",
  }).email(),
  firstName: string({
    required_error: "First name is required",
  }),
  lastName: string({
    required_error: "Last name is required",
  }),
  birthday: date({
    required_error: "Birthday is required",
  }),
  password: string({
    required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters long"),
  confirmPassword: string({
    required_error: "Confirm password is required",
  }).min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = object({
  email: string({
    required_error: "Email is required",
  }).email(),
  password: string({
    required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters long"),
  keepLoggedIn: z.boolean().optional(),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
