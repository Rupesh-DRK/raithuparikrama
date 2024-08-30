import React from 'react'
import { Skeleton, Space } from 'antd';

const ProductSkeleton = () => {
  return (
   <center>
     <div className='flex-column m-4' >
      <div><Skeleton.Image active={true}/> </div>
      <div className='m-1'><Skeleton.Button active={true} block={true} /> </div>
      <div className='m-1'><Skeleton.Button active={true}  block={true} /> </div>
      <div className='m-2'>
        <Skeleton.Button active={true}  />
        <Skeleton.Avatar active={true}  />
    </div>
    </div>
   </center>
  )
}

export default ProductSkeleton
