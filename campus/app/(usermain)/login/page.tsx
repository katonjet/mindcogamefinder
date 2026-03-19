"use client";

import { loginUser } from "@/lib/user";

async function perfromFunnyLogin(){
  const wee = await loginUser('applepie@example.com', 'password134')
  console.log(`WEST: ${wee}`)
}

export default function LoginPage() {
  return (
    <div>
        <div onClick={()=>{perfromFunnyLogin()}}>TEST LOGIN</div>
    </div>
  );
}