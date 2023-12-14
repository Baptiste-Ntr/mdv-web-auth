
'use client'

import Link from 'next/link';

import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation';
import { deleteCookie } from './actions';

export default function Home() {

  const router = useRouter()

  const checkCookie = () => {
    const cookiesList = cookies()
    const cookie = cookiesList.get("jwtToken")

    if (!cookie) {
      router.push('/login')
    }
  }

  return (
    <div className="container" onLoad={checkCookie}>
      <p>Connected</p>
      <button onClick={() => deleteCookie}>Logout</button>
    </div>
  )
}
