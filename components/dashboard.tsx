'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.name}
      
      </div>
  )
}

export default Dashboard