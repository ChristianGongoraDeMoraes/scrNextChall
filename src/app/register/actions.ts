"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

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
  
  const res = await fetch(`${process.env.PATH_URL_DOMAIN}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if(!res.ok) { 
    const errorData = await res.json().catch(() => ({}));
    console.log(errorData.message)
    return
  }
    
  redirect("/login")
}
