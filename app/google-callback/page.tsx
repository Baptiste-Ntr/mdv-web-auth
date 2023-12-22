
'use client'

import { redirect, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { loginOrRegisterWithGoogleCode, setCookieMain } from "../actions"
import { cookies } from 'next/headers'
import { googleUserType } from "@/types/types"
import { useRouter } from "next/router"

export default function GoogleCallback() {

    const searchParam = useSearchParams()

    const searchCode: string = searchParam.get('code') || ''

    // console.log(searchCode)

    useEffect(() => {


        const fetchUserGoogle = async () => {
            try {
                const userGoogle = await loginOrRegisterWithGoogleCode(searchCode)
                console.log('user google : ', userGoogle)
                return userGoogle
            } catch (error) {
                console.error(error)
            }
        }

        const fetchAndSetUser = async () => {

            const user: googleUserType = await fetchUserGoogle();

            console.log(user);

            setCookieMain('email', user.email);
            setCookieMain('name', user.name);
            setCookieMain('givenName', user.given_name);
            setCookieMain('picture', user.picture);
            setCookieMain('isEmailVerified', user.isEmailVerified ? 'true' : 'false');
            setCookieMain('id', user.id);

            // redirect('/')
        };

        fetchAndSetUser();



    }, [searchCode])




    return (
        <div className="container">
        </div>
    )
}