'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const setCookie = (token: string) => {
    cookies().set({
        name: 'jwtToken',
        value: token,
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