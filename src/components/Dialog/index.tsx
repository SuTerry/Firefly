import React from 'react'

import Stream from './Stream'
import Wallte from './Wallte'
import Register from './Register'
import Meta from './Meta'

export default (): JSX.Element => {
  return (
    <>
      <Stream />
      <Wallte />
      <Register />
      <Meta />
    </>
  )
}
