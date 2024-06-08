import { cn } from '@/lib/utils'
import React from 'react'


function MaxWidthWrapper( {children,className}:{children:React.ReactNode,className?:string} ) {
  return (
    <div className={cn('flex flex-col items-center p-4 gap-6 w-full min-h-screen relative max-w-5xl mx-auto top-28', className)}>{children}</div>
  )
}

export default MaxWidthWrapper