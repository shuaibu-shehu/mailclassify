'use server'

import { mailType } from "@/components/mail-lists";
import OpenAI from "openai";


export async function getCategories(mails: mailType[],apiKey: string) {
    try {
        
    
        const openai = new OpenAI({ apiKey});
        const classification = await Promise.all(mails.map(async (mail) => {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    {
                        role: 'user', content: `Here is my mail snippet: "${mail.snippet}", with ID: ${mail.id}. I want you to categorize it into one of the following categories:
Important: Emails that are personal or work-related and require immediate attention.
Promotions: Emails related to sales, discounts, and marketing campaigns.
Social: Emails from social networks, friends, and family.
Marketing: Emails related to marketing, newsletters, and notifications.
Spam: Unwanted or unsolicited emails.
General: If none of the above are matched, use General.
Note: Return only one category along with the email ID (e.g., ${mail.id}). Which category does this email belong to?`
                    }
                ],
                model: 'gpt-3.5-turbo',
            });

            const result = completion.choices[0].message.content?.trim();
            const [category, id] = (result?.split(',') ?? []).map(str => str.trim());

            return {
                id: mail.id,
                category: category || 'General'  // Default to General if category is not parsed properly
            };
        }));

        const classifiedMails = classification.map((mail) => {
            const classifiedMail = mails.find((m) => m.id === mail.id);
            if (classifiedMail) {
                classifiedMail.class = mail.category;
            }
            return classifiedMail;
        });

        return classifiedMails;

    } catch (error) {
        console.error('Error classifying emails:', error);
        throw new Error('Failed to classify emails');
    }
}
