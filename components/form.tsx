'use client'

import { FormValuesProps } from '@/types/FormType';
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

import axios from 'axios';
import { RedirectType, redirect, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import bcrypt from 'bcryptjs';



type FormProps = {
    typeForm: string
}



export const Form = ({ typeForm }: FormProps) => {

    const { register, handleSubmit } = useForm();

    const router = useRouter()

    const pathname = usePathname()

    const makeSalt = async () => {
        return await bcrypt.genSalt(10)
    }

    return (
        typeForm === "login" ?
            <form onSubmit={handleSubmit(async (data) => {

                axios.get('/api/connect').then(res => {
                    axios.post('/api/login', data).then((res) => {
                        console.log('Res : ', res);
                        router.push(`/user-connected`);
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err: any) => {
                    console.error(err)
                })
            })} className='container-form'>
                <input type="email" {...register('email', { required: true })} placeholder='Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                <input type="submit" />
                <Link href='/register'> Register </Link>
            </form>
            : typeForm === "register" ?
                <form onSubmit={handleSubmit(async (data) => {
                    console.log(data)


                    let salt = await bcrypt.genSalt(10)
                    let hash = bcrypt.hashSync(data['password'], salt);

                    data['password'] = hash

                    axios.get('/api/connect').then(res => {
                        console.log("oui")
                        axios.post('/api/register', data).then((res) => {
                            console.log('Res : ', res);
                            router.push(`/user-connected`);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.error(err)
                    })
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