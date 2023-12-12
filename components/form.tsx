'use client'

import { FormValuesProps } from '@/types/FormType';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormProps = {
    typeForm: string
}

export const Form = ({typeForm} : FormProps) => {

    const { register, handleSubmit } = useForm();

    return (
        typeForm === "login" ?
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })} className='container-form'>
                <input type="email" {...register('email', { required: true })} placeholder='Email' />
                <input type="password" {...register('password', { required: true, minLength: 8 })} placeholder='Password' />
                <input type="submit" />
            </form>
        : null
    )
}