"use client"


import { useFormState, useFormStatus } from "react-dom";
import { useActionState } from "react";
import { register } from "./actions";
import { redirect } from "next/navigation";


export function RegisterForm(){
   const [state, formAction] = useActionState(register, undefined);

  function gotoLogin(){
      redirect("/login");
    }

     return (
       <form action={formAction} className="flex max-w-[300px] flex-col gap-2 p-12 rounded-lg border bg-white/30 shadow">
         
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
         
           <input
             id="confirm"
             name="confirm"
             type="password"
             placeholder="Confirm password"
             className="bg-black/30 border rounded p-1"
           />
        
         {state?.errors?.confirm && (
           <p className="text-red-500">{state.errors.confirm}</p>
         )}
         <SubmitButton />
         <p onClick={()=>{gotoLogin()}} className="p-2 text-white hover:underline cursor-pointer w-full text-center">Login</p>
       </form>
     );
   }
   
   function SubmitButton() {
     const { pending } = useFormStatus();
   
     return (
       <button disabled={pending} type="submit" className="cursor-pointer p-2 rounded bg-white text-black hover:bg-gray-200">
         Register
       </button>
     );
}