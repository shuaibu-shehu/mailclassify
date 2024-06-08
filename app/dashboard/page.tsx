import React from 'react'
import Dashboard from '../../components/dashboard'
import MailLists, { mailType } from '@/components/mail-lists';
import MaxWidthWrapper from '@/components/max-width';
import { getMails } from '@/lib/actions/getMails';
async function DashboardPage() {
  
  return (
    <MaxWidthWrapper>
        <Dashboard />
        <MailLists />      
    </MaxWidthWrapper>
  )
}

export default DashboardPage