"use client"


import { useFormState, useFormStatus } from "react-dom";
import { register } from "./actions";


export function RegisterForm(){
   const [state, formAction] = useFormState(register, undefined);

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
       </form>
     );
   }
   
   function SubmitButton() {
     const { pending } = useFormStatus();
   
     return (
       <button disabled={pending} type="submit" className="cursor-pointer">
         Register
       </button>
     );
}