import React from 'react'

function LikeButton({className , isLiked , onClick}) {
  return (
    <button onClick={onClick}><i className={`${isLiked ? 'fa-solid fa-heart text-red-700' : 'fa-regular fa-heart'} ${className} text-lg`}></i></button>
  )
}

export default LikeButton