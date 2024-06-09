'use client'

import { useAppState } from '@/lib/providers/app-state';
import Link from 'next/link';

export interface mailType{
  body: string
  id: string,
  subject: string,
  snippet: string,
  class: string
}

function MailLists() {
  const { state, dispatch } = useAppState();

if(state.isLoading || !state.mails.length){
  return <div>loading...</div>
}
  return (
    <div className='flex flex-col gap-3 mt-7'>
      {state.mails.map((mail: mailType) => (

<Link href={'/dashboard/email-item'} key={mail.id} onClick={()=>{
  dispatch({type:"SET_SELECTED_MAIL", payload: mail})
}} className="p-4 border-2 flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="font-bold">{mail.subject}</div>
              <div className="text-sm text-blue-500">{mail.class} </div>
            </div>
            <div className="text-sm text-muted-foreground">{mail.snippet}</div>
    </Link>

      ))}
    </div>
  );
}

export default MailLists;
