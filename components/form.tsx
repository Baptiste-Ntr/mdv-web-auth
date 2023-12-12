'use client'

import { FormValuesProps } from '@/types/FormType';
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

import axios from 'axios';
import { RedirectType, redirect, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

type FormProps = {
    typeForm: string
}

export const Form = ({ typeForm }: FormProps) => {

    const { register, handleSubmit } = useForm();

    const router = useRouter()

    const pathname = usePathname()

    return (
        typeForm === "login" ?
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                axios.post('/api/login', data).then((res) => {
                    console.log('Res : ', res);
                    router.push(`/user-connected`);
                }).catch((err) => {
                    console.log(err);
                });

            })} className='container-form'>
                <input type="email" {...register('email', { required: true })} placeholder='Email' />
                <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                <input type="submit" />
                <Link href='/register'> Register </Link>
            </form>
            : typeForm === "register" ?
                <form onSubmit={handleSubmit((data) => {
                    console.log(data)
                    axios.post('/api/register', data).then((res) => {
                        console.log('Res : ', res);
                        router.push(`/user-connected`);
                    }).catch((err) => {
                        console.log(err);
                    });
                })}>
                    <input type="email" {...register('email', { required: true })} placeholder='Email' />
                    <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                    <input type="password" {...register('passwordConfirmation', { required: true, minLength: 8 })} placeholder='Confirm Password' />
                    <input type="submit" />
                    <Link href='/'> Login </Link>
                </form>
                : null
    )
}