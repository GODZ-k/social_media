import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function AvatarImg({src , className, fallback , onChange}) {
  return (
    <Avatar className={`${className} w-8 h-8`}>
  <AvatarImage src={src} onChange={onChange} />
  <AvatarFallback>{fallback}</AvatarFallback>
</Avatar>

  )
}

export default AvatarImg