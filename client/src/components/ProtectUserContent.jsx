import React from 'react'

function ProtectUserContent({className,children}) {
  return (
    <div className={className}>{children}</div>
  )
}

export default ProtectUserContent