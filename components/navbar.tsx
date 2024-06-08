"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOut, MenuIcon, User2 } from "lucide-react";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { test } from "@/lib/actions/test";
import { useEffect, useState } from "react";
import { getMails } from "@/lib/actions/getMails";
import { useAppState } from "@/lib/providers/app-state";
import { mailType } from "./mail-lists";

export function Navbar() {
  const user = useSession().data?.user || null;
  const {dispatch, state} = useAppState()  
  
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const {data, error} = await getMails(state.maxMails)
        if (data) {
          // Dispatch the action to update the state with the fetched data
          dispatch({ type: 'SET_MAILS', payload: data as unknown as mailType[] });
      
        }
      } catch (error) {
        
      }
    }
    fetchMails()
  }, [ state.mails, state.maxMails]);

  return (
    <div className=" max-w-5xl top-0  gap-3 fixed p-3  left-0 right-0 flex flex-col  mx-auto w-full justify-between  ">
      
      <div className=" flex justify-between">

        <div className=" justify-between items-center  flex gap-3">

          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback><User2 /></AvatarFallback>
          </Avatar>

          <div className=" text-muted-foreground">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>

        </div>
        <Button variant={'link'} onClick={() => signOut()}><LogOut className=" text-muted-foreground" /></Button>
      </div>

      <div className=" flex justify-between">
        <Select value={state.maxMails.toString()} onValueChange={async (e)=>{
            
            const {data, error} = await getMails(Number(e))
            dispatch({type:'UPDATE_MAX_MAILS', payload:Number(e)})
            
            console.log(data);
            
            console.log(state.maxMails);
            
            console.log(state.mails);
            
        }}>
          <SelectTrigger className="w-[80px]" >
          <SelectValue placeholder="Select" />
          </SelectTrigger>
            <SelectContent className="w-[40px]">
              <SelectGroup >
              {Array(10).fill(0).map((_,i)=>{
               return <SelectItem className="w-40px" key={i} value={((i + 1) * 10).toString()}>{((i + 1) * 10)}</SelectItem>
                
                })}
              </SelectGroup>
            </SelectContent>
        </Select>
        <Button onClick={ async ()=>{
          
          test()
        }}>Classify</Button>
      </div>
    </div>
  );
}
