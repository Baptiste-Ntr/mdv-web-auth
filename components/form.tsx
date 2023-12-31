'use client'

import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { Login } from '@/utils/login';
import { Register } from '@/utils/register';
import { setCookie } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


import { useState } from 'react';

export const Form = ({ typeForm }: any) => {

    const { register, handleSubmit } = useForm();

    const router = useRouter();

    const [isSubmitLogin, setIsSubmitLogin] = useState(false);
    const [isSubmitRegister, setIsSubmitRegister] = useState(false);

    useEffect(() => {

    }, [isSubmitLogin, isSubmitRegister])

    return (
        typeForm === "login" ?
            <form onSubmit={handleSubmit(async (data) => {
                // console.log(data)
                setIsSubmitLogin(!isSubmitLogin)
                Login(data, router)
            })} className='container-form'>
                <input type="email" {...register('email', { required: true })} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                <input type="submit" />
                <Link href='/register'> Register </Link>
            </form>
            : typeForm === "register" ?
                <form onSubmit={handleSubmit(async (data) => {
                    setIsSubmitRegister(!isSubmitRegister)
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