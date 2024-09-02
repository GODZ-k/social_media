import React from 'react'

function CommentButton({className}) {
  return (
    <button><i className={`${className} fa-regular fa-comment text-lg`}></i></button>
  )
}

export default CommentButton