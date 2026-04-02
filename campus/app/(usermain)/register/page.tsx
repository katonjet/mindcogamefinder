"use client";

import { H2 } from "@/app/frontend/Common";
import { Glass } from "@/app/frontend/Glass";
import { isLoggedIn, registerUser } from "@/lib/user";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { GlyphClass } from "@/app/frontend/Glyphs";

export default function Register() {

  const router = useRouter();

  //entry data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value);};
  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value);};
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);};
  const handlePwd1 = (event: React.ChangeEvent<HTMLInputElement>) => {setPassword1(event.target.value);};
  const handlePwd2 = (event: React.ChangeEvent<HTMLInputElement>) => {setPassword2(event.target.value);};

  const [errorMsg, setErrorMsg] = useState("");
  const [errorPop, setErrorPop] = useState(false);

  const triggerError = async (msg: string) => {
      console.error("Registration failed: " + msg)
      setErrorPop(true);
      setErrorMsg(msg);
  }

  //Redirect logged in users to main page
  useEffect(()=>{
    const asyncFn = async () => {
      if (isLoggedIn()){
        router.push('/user')
      }
    }
    asyncFn()
  },[])

  const triggerSignUp = async () => {

    setErrorPop(false)

    if (!name) {{triggerError("Name required!"); return;}}
    if (!username) {{triggerError("Username required!"); return;}}
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {{triggerError("Email is invalid!"); return;}}
    if (!password1 || password1!==password2) {{triggerError("Password empty or mismatch!"); return;}}

    const serverRes = await registerUser(
      name,
      email,
      username,
      password1,
      password2,
    );

    if (!serverRes)
      {triggerError("Registration failed!"); return;}
    else
      {router.push('/login')}

  }

  return (
    <div className="grid items-center justify-center min-h-full min-w-full fixed">

        <Glass className="p-4 bg-white/10">
          
                <div className="flex flex-row min-w-160">
                    <div className="flex-1"></div>

                    <div className="flex flex-col flex-5">

                        <div style={{ lineHeight: '1' }} className={`${GlyphClass().className} p-0 m-0 text-center text-[200px] text-shadow-none`}>A</div>
                        <H2 className="m-0 pl-0 text-center">Create an account</H2>

                        <div className="mt-4 mb-2">
                            <div className=" ml-1 mb-1">Name</div>
                            <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="text" name="" onChange={handleName} />
                        </div>

                        <div className="mt-4 mb-2">
                            <div className=" ml-1 mb-1">Username</div>
                            <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="text" name="" onChange={handleUsername} />
                        </div>

                        <div className="mt-4 mb-2">
                            <div className=" ml-1 mb-1">Email</div>
                            <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="text" name="" onChange={handleEmail} />
                        </div>

                        <div className="mt-4 mb-2">
                            <div className=" ml-1 mb-1">Password</div>
                            <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="password" name="" onChange={handlePwd1} />
                        </div>

                        <div className="mt-4 mb-2">
                            <div className=" ml-1 mb-1">Confirm password</div>
                            <input  className="rounded-4xl bg-black/60 p-2 min-w-full" type="password" name="" onChange={handlePwd2} />
                        </div>
                        {(errorPop) ? (<Glass className="bg-red-500/70 text-red-200 p-5">
                            {errorMsg}
                        </Glass>) : null}

                        <div className="flex flex-row mt-4 mb-4">
                            <div className="flex-1"></div>
                            <Glass className={`p-3 m-0`} onClick={()=>{triggerSignUp()}} >Register</Glass>
                        </div>


                    </div>
                    <div className="flex-1"></div>
                </div>

        </Glass>
        <div className="m-0"></div>

    </div>
  );
}