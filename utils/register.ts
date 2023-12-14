import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";

export const Register = (data: any, router: any) => {
    axios.get('/api/connect').then(res => {
        console.log("oui")
        axios.post('/api/register', data).then((res) => {
            console.log('Res : ', res);
            toast.success('You are registered !')
            router.push(`/`);
        }).catch((err) => {
            toast.error(err.response.data);
            console.log(err);
        });
    }).catch((err) => {
        toast.error(err.response.data);
        console.error(err)
    })
}