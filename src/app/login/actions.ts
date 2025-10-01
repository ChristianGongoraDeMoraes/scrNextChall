"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import  bcrypt  from "bcrypt";
import { prisma } from "../lib/prisma";

const testUser = {
  id: "1",
  email: "chris@hotmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = await prisma.userM.findUnique({ where: { email } });

  if (user == null) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  
  if( !passwordMatch ){
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
  await createSession(String(user.id));
  
  redirect("/calculadora");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
