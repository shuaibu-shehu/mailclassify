import GoogleProvider from "next-auth/providers/google"

export default {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorization: {
            params: {
              access_type: 'offline',
              prompt: 'consent',
              scope: [
                'openid',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/gmail.readonly',
              ].join(' '),
              response: 'code',
            },
          },
        })
      ],  
      secret: process.env.AUTH_SECRET,
} 