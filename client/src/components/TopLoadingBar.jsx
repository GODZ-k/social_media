
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

function TopLoadingBar() {
    const [progress, setProgress] = useState(100)
  return (
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  )
}

export default TopLoadingBar