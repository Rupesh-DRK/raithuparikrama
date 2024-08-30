import { Skeleton } from 'antd'
import React from 'react'

const ButtonSkeleton = () => {
  return (
      <Skeleton.Button active={true}  shape='round' block={true} size='small' className='my-1'/>
  )
}

export default ButtonSkeleton
