import React from 'react'

function ShareButton({className}) {
  return (
    <button><i className={`${className} fa-solid text-lg fa-share`}></i></button>
  )
}

export default ShareButton