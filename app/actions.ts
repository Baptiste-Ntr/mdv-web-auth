'use server'

import { googleUserType } from '@/types/types'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export const setCookie = (token: string) => {
    cookies().set({
        name: 'jwtToken',
        value: token,
        path: '/',
        httpOnly: false,
        maxAge: 3600,
    })
}

export const setCookieMain = (name: string, value: string) => {
    cookies().set({
        name: name,
        value: value,
        path: '/',
        httpOnly: false,
        maxAge: 3600,
    })
}

export const checkCookie = () => {
    const cookiesList = cookies()
    const cookie = cookiesList.get("jwtToken")

    if (!cookie) {
        redirect("/login")
    }
}

export const deleteCookie = () => {
    console.log('Deleting cookie')
    cookies().delete('jwtToken')
    redirect('/login')
}


export const loginOrRegisterWithGoogleCode = async (code: string) => {
    console.log('Logging in with Google code', code)

    try {
        const res = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'http://localhost:3000/google-callback',
                grant_type: 'authorization_code'
            })
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const data = await res.json();
        const access_token = data.access_token;
        console.log(data);

        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const userData = await response.json();

        const googleUser: googleUserType = {
            id: userData.sub,
            email: userData.email,
            isEmailVerified: userData.verified_email,
            name: userData.name,
            given_name: userData.given_name,
            picture: userData.picture,
            locale: userData.locale,
        }

        console.log('user google server : ', userData)

        return googleUser;

    } catch (error) {
        console.error(error);
    }
}