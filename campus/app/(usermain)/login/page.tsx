"use client";

import { H2 } from "@/app/frontend/Common";
import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { isLoggedIn, loginUser } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function perfromFunnyLogin(){
  const wee = await loginUser('applepie@example.com', 'password134')
  console.log(`WEST: ${wee}`)
}

export function LoginPage() {
  return (
    <div>
        <div onClick={()=>{perfromFunnyLogin()}}>TEST LOGIN</div>
    </div>
  );
}

export default function Login() {

  const router = useRouter();

  //Redirect logged in users to main page
  useEffect(()=>{
    const asyncFn = async () => {
      if (isLoggedIn()){
        router.push('/user')
      }
    }
    asyncFn()
  },[])

  const [errorMsg, setErrorMsg] = useState("");
  const [errorPop, setErrorPop] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginButtonDisable, setLoginButtonDisable] = useState(false);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);};
  const handlePwd = (event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value);};
  
  const triggerError = async (msg: string) => {
      console.error("Login failed: " + msg)
      setErrorPop(true);
      setErrorMsg(msg);
      setLoginButtonDisable(false)
  }

  const triggerLogin = async () => {

    setErrorPop(false)
    setLoginButtonDisable(true)

    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {{triggerError("Email is empty or invalid!"); return;}}
    if (!password) {{triggerError("Password required!"); return;}}

    const serverRes = await loginUser(email, password);

    if (!serverRes)
      {triggerError("Login failed!");}
    else
      {router.push('/')}

    setLoginButtonDisable(false)
  }

  return (
    <div className="grid items-center justify-center min-h-full min-w-full fixed">
    
            <Glass className="p-4 bg-white/10">
              
                    <div className="flex flex-row min-w-160">
                        <div className="flex-1"></div>
    
                        <div className="flex flex-col flex-5">

                            <div style={{ lineHeight: '1' }} className={`${GlyphClass().className} p-0 m-0 text-center text-[200px] text-shadow-none`}>A</div>
                            <H2 className="m-0 pl-0 text-center">Login to your account</H2>
    
                            <div className="mt-4 mb-2">
                                <div className=" ml-1 mb-1">Email</div>
                                <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="text" name="" onChange={handleEmail} />
                            </div>
    
                            <div className="mt-4 mb-2">
                                <div className=" ml-1 mb-1">Password</div>
                                <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="password" name="" onChange={handlePwd} />
                            </div>
    
                            {(errorPop) ? (<Glass className="bg-red-500/70 text-red-200 p-5">
                                {errorMsg}
                            </Glass>) : null}
    
                            <div className="flex flex-row mt-4 mb-4">
                                <Link href={'/register'}>
                                  <Glass className={`p-3 m-0`} onClick={()=>{}} >Register</Glass>
                                </Link>
                                <div className="flex-1"></div>
                                <Glass className={`p-3 m-0 ${(loginButtonDisable) ? 'bg-yellow-300 text-yellow-950' : ''}`} onClick={(loginButtonDisable) ? ()=>{} : triggerLogin} >{(loginButtonDisable) ? 'Logging in...' : 'Log in'}</Glass>
                            </div>
    
    
                        </div>
                        <div className="flex-1"></div>
                    </div>
    
            </Glass>
            <div className="m-0"></div>
    
        </div>
  );
}