
'use client'

import Link from 'next/link';

import { cookies } from 'next/headers'
import { redirect, useRouter } from 'next/navigation';
import { checkCookie, deleteCookie } from './actions';
import { useEffect } from 'react';

import axios from 'axios';

export default function Home() {

  const handleTOTP = () => {
    axios.get('/api/connect').then(res => {
      axios.get('/api/totp').then(res => {
        
      })
    })
  }

  useEffect(() => {
    checkCookie();
  }, [])

  return (
    <div className="container">
      <p>Connected</p>
      <button onClick={deleteCookie}>Logout</button>
      <button onClick={handleTOTP}>Enable TOTP</button>
    </div>
  )
}
