import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, apiAuthPrefix, publicRoutes } from "./routes";

const { auth }= NextAuth(authConfig)

export default auth((req)=>{
  const {nextUrl} = req
  const isLoggedIn=req.auth
  
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    

  if(isLoggedIn && nextUrl.pathname ==='/'){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }
  

  // if(!isLoggedIn && nextUrl.pathname ==='/dashboard'){    
  //   console.log("redirecting to login");
  //   console.log(nextUrl.pathname);
    
  //    return Response.redirect(new URL("/", nextUrl))
  // }
  return;
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}