'use client'

import React from 'react'
import { signIn } from "next-auth/react";
import { Button } from './ui/button';
import Image from 'next/image';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';


function Oauth() {
  const router = useRouter()
  return (
    <div className=' flex flex-col gap-9'>
    <Button onClick={()=>{
      signIn('google')
      router.push('/dashboard')
      }} > <Image src={'/google.png'} height={20} width={20} alt='google logo' /> Login with google</Button>
    <Input placeholder='Enter openai api' />
    </div>
  )
}

export default Oauth