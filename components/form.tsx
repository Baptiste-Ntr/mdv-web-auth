'use client'

import { FormValuesProps } from '@/types/FormType';
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

import axios from 'axios';
import { RedirectType, redirect, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import bcrypt from 'bcryptjs';
import toast from 'react-hot-toast';



type FormProps = {
    typeForm: string
}



export const Form = ({ typeForm }: FormProps) => {

    const { register, handleSubmit } = useForm();

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const makeSalt = async () => {
        return await bcrypt.genSalt(10)
    }

    return (
        typeForm === "login" ?
            <form onSubmit={handleSubmit(async (data) => {

                axios.get('/api/connect').then(res => {
                    const api = axios.post('/api/login', data).then((res) => {
                        console.log('Res : ', res);
                        console.log(res)
                        router.push(`/user-connected`);
                        toast.success('You are connected !')
                    }).catch((err) => {
                        console.log(err.response.data);
                        toast.error(err.response.data);
                    });
                }).catch((err: any) => {
                    console.error(err)
                    toast.error(err.response.data)
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

                    axios.get('/api/connect').then(res => {
                        console.log("oui")
                        axios.post('/api/register', data).then((res) => {
                            console.log('Res : ', res);
                            toast.success('You are registered !')
                            router.push(`/user-connected`);
                        }).catch((err) => {
                            toast.error(err.response.data);
                            console.log(err);
                        });
                    }).catch((err) => {
                        toast.error(err.response.data);
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