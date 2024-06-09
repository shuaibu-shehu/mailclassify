'use client'

import EmailItem from '@/components/email-item'
import MaxWidthWrapper from '@/components/max-width'
import { useAppState } from '@/lib/providers/app-state'
import React from 'react'

function EmailItemPage() {
  const {state, dispatch} = useAppState()
  console.log(state.selectedMail);
  
  return (
    <MaxWidthWrapper>
      <EmailItem body={state.selectedMail?.body!} />
    </MaxWidthWrapper>
  )
}

export default EmailItemPage