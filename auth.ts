import NextAuth, { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import authConfig from "./auth.config"

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers :{ GET, POST}, auth, signIn, signOut } = NextAuth({
   callbacks:{
    async jwt({ token, user, account }) {
      
      //initial sign in
      
      if (account && user) {
        return { 
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000, // 3600 seconds
          refresh_token: account.refresh_token,
        }
      } else if (Date.now() < Number(token.expires_at)) {
         return token;
      } else{
        try {
          const res = await fetch("https://oauth2.googleapis.com/token", { 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID as string, // Type assertion
              client_secret: process.env.GOOGLE_CLIENT_SECRET as string, // Type assertion
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token as string, // Type assertion
            }),
            method: 'POST',
           });
           const tokens = await res.json();
           if (!res.ok) throw tokens;
            return {
              ...token, // Keep the previous token properties
              access_token: tokens.access_token,
              expires_at: Date.now() + Number(tokens.expires_in) * 1000,
              refresh_token: tokens.refresh_token,
            };  // updated inside session-token cookie
        } catch (error) {
             // The error property will be used client-side to handle the refresh token error
             return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
      return token;
    },
    async session({ session, token }) {
      // This will be accessible in the client side using useSession hook
      // The auth() function should return jwt response but instead it returns
      // the session object. This is a bug in next-auth.
      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
   } ,
  
   session: { strategy: "jwt"},
  ...authConfig,
  
})