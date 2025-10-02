"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { redirect } from "next/navigation";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  function gotoRegister(){
    redirect("/register");
  }

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-2 p-12 rounded-lg border bg-white/30 shadow">
      <input id="email" name="email" placeholder="Email" className="bg-black/30 border rounded p-1"/>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="bg-black/30 border rounded p-1"
        />
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
      <p onClick={() => gotoRegister()} className="p-2 text-white hover:underline cursor-pointer w-full text-center">Register</p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
      <button disabled={pending} type="submit" className="cursor-pointer p-2 rounded bg-white text-black hover:bg-gray-200">
        Login
      </button>
  );
}
