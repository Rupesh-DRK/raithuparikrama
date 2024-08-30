import { Skeleton } from 'antd'
import React from 'react'
import { DotChartOutlined } from '@ant-design/icons';

const DotSkeleton = () => {
  return (
    <Skeleton.Node active={true}>
          <DotChartOutlined
            style={{
              fontSize: 40,
              color: '#bfbfbf',
            }}
          />
        </Skeleton.Node>
  )
}

export default DotSkeleton
