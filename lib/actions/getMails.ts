'use server'

import { gmail_v1, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth, EnrichedSession } from '@/auth';

export async function getMails(max:number = 10) {
  
  const session = (await auth()) as EnrichedSession;
  const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;


  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret
  });

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

   // Use the provider token to authenticate with the Google gmail API
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const gmailRes = await gmail.users.messages.list({
      userId: 'me',
      maxResults: max,
    });

    const messages = gmailRes.data.messages || [];
    
    const messagePromises = messages.map(async (message) => {
        const messageDetail = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
        });
        const fullMessage = parseMessageContent(messageDetail.data);
        return fullMessage;
        // return messageDetail.data;
      });
  
      const messageDetails = await Promise.all(messagePromises);

    return  {data: messageDetails, error: null };
  } catch (error) {
    console.error('Error fetching emails', error);
    return {data: null, error: 'Failed to fetch emails'};
  }
}


function parseMessageContent(message:any) {
  const headers = message.payload?.headers;
  const subjectHeader = headers?.find((header:any) => header.name === 'Subject');
  const subject = subjectHeader ? subjectHeader.value : '';
  const snippet = message.snippet;

  const parts = message.payload.parts;
  let body = '';

  const getMessageBody = (parts:any) => {
    parts.forEach((part:any) => {
      if (part.mimeType === 'text/plain') {
        body += Buffer.from(part.body.data, 'base64').toString('utf8');
      } else if (part.mimeType === 'text/html') {
        body += Buffer.from(part.body.data, 'base64').toString('utf8');
      } else if (part.parts) {
        // Recursively handle nested parts
        getMessageBody(part.parts);
      }
    });
  };

  if (parts && parts.length > 0) {
    getMessageBody(parts);
  } else if (message.payload.body && message.payload.body.data) {
    body = Buffer.from(message.payload.body.data, 'base64').toString('utf8');
  }

  return {
    id: message.id,
    body,
    subject,
    snippet,
    class: ''
  };
}

// function parseMessageContent(message) {
//   const headers = message.payload?.headers;
//   const subjectHeader = headers?.find(header => header.name === 'Subject');
//   const subject = subjectHeader ? subjectHeader.value : '';

//   // Extract plain text and HTML parts
//   let plainText = '';
//   let htmlText = '';
//   if (message.payload?.mimeType === 'text/plain') {
//     plainText = Buffer.from(message.payload.body?.data, 'base64').toString('utf8');
//   } else if (message.payload?.mimeType === 'text/html') {
//     htmlText = Buffer.from(message.payload.body?.data, 'base64').toString('utf8');
//   } else {
//     // Handle multipart messages
//     const parts = message.payload?.parts || [];
//     parts.forEach(part => {
//       if (part.mimeType === 'text/plain') {
//         plainText += Buffer.from(part.body?.data, 'base64').toString('utf8');
//       } else if (part.mimeType === 'text/html') {
//         htmlText += Buffer.from(part.body?.data, 'base64').toString('utf8');
//       }
//     });
//   }

//   return {
//     id: message.id,
//     threadId: message.threadId,
//     subject,
//     plainText,
//     htmlText
//   };
// }