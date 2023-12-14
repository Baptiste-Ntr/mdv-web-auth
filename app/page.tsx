
'use client'

import Link from 'next/link';

import { cookies } from 'next/headers'
import { redirect, useRouter } from 'next/navigation';
import { checkCookie, deleteCookie } from './actions';

export default function Home() {

  return (
    <div className="container" onLoad={checkCookie}>
      <p>Connected</p>
      <button onClick={() => deleteCookie}>Logout</button>
    </div>
  )
}
