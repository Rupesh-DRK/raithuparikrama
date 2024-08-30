import { Skeleton } from 'antd'
import React from 'react'

const AvatarSkeleton = () => {
  return (
    <Skeleton.Avatar active={true} shape={'circle'} style={{width:'80px',height:'80px'}} />
  )
}

export default AvatarSkeleton
