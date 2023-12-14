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

export const deleteCookie = () => {
    cookies().delete('jwtToken')
    redirect('/login')
}