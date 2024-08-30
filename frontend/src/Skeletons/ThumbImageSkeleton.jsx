import React from 'react'
import { DotChartOutlined } from '@ant-design/icons';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';

const ThumbImageSkeleton = () => {
  return (
   <div className='col-12' >
    <center  style={{objectFit:'cover'}}>
    <Space >
        <Skeleton.Image active={true} style={{aspectRatio:'4/3',width:'100%'}}/>
      </Space>
    </center>
   </div>

  )
}

export default ThumbImageSkeleton
