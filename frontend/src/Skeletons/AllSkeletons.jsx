import React, { useEffect, useState } from 'react'
import ThumbImageSkeleton from './ThumbImageSkeleton'
import ProductSkeleton from './ProductSkeleton'
import ImageSkeleton from './ImageSkeleton'
import DotSkeleton from './DotSkeleton'

const AllSkeletons = () => {
  
    return (
      <div className='col-12 d-flex'>  
      <div className='col-6' style={{aspectRatio:'4/3'}}>
        <ImageSkeleton />
      </div>    
      <div className="col-6" style={{aspectRatio:'4/3'}}>
        <DotSkeleton />
      </div>
          
      </div>
    )
}
export default AllSkeletons
