import { Badge, Card, Space } from 'antd';
import React from 'react'

export default function Card(prop) {
  return (
    <div  className="CardComponent" >
 
 <Space direction="vertical" size="middle" style={{ width: '100%' }}>
    <Badge.Ribbon text="Hippies">
      <card title="Pushes open the window" size="small">
      <div className="card-body">
    <p  className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
      </card>
    </Badge.Ribbon>
    </Space>
  </div>

  )
}