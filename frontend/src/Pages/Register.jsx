import React, { useState } from 'react'
import "../App.scss"
import a from "../assets/bg.jpg"
import Footer from '../Components/Footer';
export default function Register() {
  const [img,setImg]=useState();
  const state = ["select State","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand", "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Lakshadweep","Puducherry"];
  return (
    <>
    <div className='register'>
      <form action="">
        <h2>REGISTRATION FORM</h2>
       <div className="d-flex"> <label htmlFor="pic"><i className="fa-solid fa-camera-retro"></i>  choose your profile</label>
        <input type="file" onChange={(e)=>setImg(e.target.files[0])} id="pic" style={{display:'none'}}/> <div className="img ps-2"><img src={img? URL.createObjectURL(img):a} alt="" width={100} /></div></div>
       <input  placeholder="Firstname "type="text" id='fname' /><br />
       <input  placeholder="Example.com "type="text" id='mail'/><br />
       <input  placeholder="Mobile "type="tel" id='mobile'/><br />
        <select name="gender" id="gender">
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="others">others</option>
        </select><br />
       <input  placeholder=" CompanyName"type="text" id='cname'/><br />
       <input  placeholder="Pincode "type="tel" id="pin" /><br />
        <select name="" id="state">
        
           {state.map((st,index) =>{
            return(
              <option value={st}>{st}</option>
            )
           })}

        </select>
       <input  placeholder=" "type="submit" /><br />
      </form>
    </div>
    <Footer/>
    </>
  )
}