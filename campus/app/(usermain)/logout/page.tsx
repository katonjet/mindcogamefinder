'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { logoutUser } from "@/lib/user";

export default function LogOutUser(){

    const router = useRouter();

    useEffect(() => {

        const logoutFromFront = async () => {
            try {
                const response = await logoutUser(); //logout user from laravel
                console.log(response.message);
            } catch (error) {
                const errorText = (error instanceof Error)? (`${error.name}: ${error.message}`) : String(error);
                console.log(errorText);
            }
            router.push('/login'); //redirect to login page
        }

        logoutFromFront();

    }, []);

    return <><p>Logging out......</p></>;

}