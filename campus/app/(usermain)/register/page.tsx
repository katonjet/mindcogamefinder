"use client";

import { registerUser } from "@/lib/user";

async function perfromFunnySignUp() {
    const wee = await registerUser(
        "Apple Pie",
        "apple@apple.com",
        'applepie',
        'password134',
        'password134',
    );
    console.log(`EAST: ${wee}`)
}

export default function LoginPage() {
  return (
    <div>
        <div onClick={()=>{perfromFunnySignUp()}}>TEST SIGN UP</div>
    </div>
  );
}