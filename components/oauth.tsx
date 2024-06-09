'use client'

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

function Oauth() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    if (apiKey) {
      // Store the API key in local storage, session storage, or handle it securely as needed
      localStorage.setItem('openaiApiKey', apiKey);

      await signIn('google');
      router.push('/dashboard');
    } else {
      alert('Please enter the OpenAI API key');
    }
  };

  const words = `Welcome to EmailSimplify, a tool that uses the power of OpenAI to help you classify emails faster and more effectively. To get started, please sign in with your Google account and enter your OpenAI API key.`

  return (
    <div className=' w-full sm:max-w-[600px] flex  text-muted-foreground flex-col gap-9'>

      <TextGenerateEffect className=' text-muted-foreground' words={words} />
      <div className='flex flex-col gap-9  '>
        <Button className='flex gap-2' onClick={handleSignIn}>
          <Image src={'/google.png'} height={20} width={20} alt='google logo' />
          Login with Google
        </Button>
        <Input
          placeholder='Enter OpenAI API key'
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Oauth;
