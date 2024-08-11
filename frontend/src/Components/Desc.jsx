import React from 'react'
import Card from './Card'
import "../App.scss"


export default function Desc() {
  return (
    <div className="des m-5 p-4">
    <div className="d-grid justify-content-center">
        <h2>people all around india love us!</h2>
        <p>From big to small ,we have all kinds if high quality products that you need</p>
    </div>
    <div className="row d-flex justify-content-center ">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
   </div>

</div>
  )
}