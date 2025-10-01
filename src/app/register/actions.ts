"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import  bcrypt  from "bcrypt";
import { prisma } from "../lib/prisma";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  confirm: z.string()
}).refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "As senhas não conferem",
});

export async function register(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {email, password} = result.data;
  const passhashed = await bcrypt.hash(password, 12);

  await prisma.userM.create({
    data: { email: email, password_hash: passhashed }
  });
  redirect("/login")
}
