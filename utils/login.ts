import { setCookie } from "@/app/actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export const Login = (data: any, router: any) => {



    axios.get('/api/connect').then(res => {
        axios.post('/api/login', data).then((res: any) => {
            console.log("data : ", data)
            setCookie(res.data.token)
            console.log('Res : ', res);
            toast.success('You are connected !')
            // redirect(`/user-connected`);
            router.push(`/`);
            // NextResponse.redirect(new URL('/user-connected', window.location.href))
        }).catch((err) => {
            toast.error(err.response.data);
            console.log(err.response.data);
        });
    }).catch((err: any) => {
        console.error(err)
        toast.error(err.response.data)
    })
}