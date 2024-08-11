import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewUserLogin = () => {
    const [OtpSent, setOtpSent] = useState(false)
    const navigate = useNavigate()
    const getOtp = () =>{
        console.log(OtpSent)
        
        if(document.getElementById(`mobile`).value != "" ){
            setOtpSent(true);
        console.log(OtpSent)
        }
    }
    const validateOTP = () => {
        
        if (document.getElementById(`otpField`).value === '1234'){
            console.log('OTP VALIDATED SUCCESSFULLY');
        navigate("/");
        }
        else {
            
        }

    }
  return (
    <div className='d-flex justify-content-center'>
      <form className='form w-50 d-grid justify-content-center rounded'>
        <div className='d-flex m-0 p-0'>
        <label htmlFor="mobile" className='d-flex w-50 align-items-center'>IND +91</label>
        <input id='mobile' type="tel" className='form-control my-2' placeholder='Enter Your 10 digit mobile number' required />
        </div>
        {OtpSent === true? 
           <><input type='tel' className='form-control my-2' placeholder='Enter OTP' required />
         <input type="submit" value="Submit OTP" className='btn btn-success m-0' onSubmit={validateOTP} id='otpField'/> </>  :
        <input type="button" value="Get OTP" className='btn btn-success m-0' onClick={getOtp}/> 
        }
      </form>
    </div>
  )
}

export default NewUserLogin
