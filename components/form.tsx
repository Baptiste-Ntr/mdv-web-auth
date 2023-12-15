'use client'

import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { Login } from '@/utils/login';
import { Register } from '@/utils/register';
import { setCookie } from '@/app/actions';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';


import { useState } from 'react';

export const Form = ({ typeForm }: any) => {

    const { register, handleSubmit } = useForm();

    const router = useRouter();

    const [isSubmitLogin, setIsSubmitLogin] = useState(false);
    const [isSubmitRegister, setIsSubmitRegister] = useState(false);

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&scope=profile%20email&redirect_uri=http://localhost:3000/google-callback&access_type=offline`


    return (
        typeForm === "login" ?
            <form onSubmit={handleSubmit(async (data) => {
                // console.log(data)
                // setIsSubmitLogin(!isSubmitLogin)
                Login(data, router)
            })} className='container-form'>
                <input type="email" {...register('email', { required: true })} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                <input type="submit" />
                <Link href='/register'> Register </Link>
                <input type='button' value={"Sign in with Google"} onClick={() => { router.push(googleUrl) }} />
            </form>
            : typeForm === "register" ?
                <form onSubmit={handleSubmit(async (data) => {
                    // setIsSubmitRegister(!isSubmitRegister)
                    Register(data, router)
                })}>
                    <input type="email" {...register('email', { required: true })} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                    <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                    <input type="password" {...register('passwordConfirmation', { required: true, minLength: 8 })} placeholder='Confirm Password' />
                    <input type="submit" />
                    <Link href='/'> Login </Link>
                </form>
                : null
    )
}