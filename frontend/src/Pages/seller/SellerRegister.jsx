import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert2 from 'react-sweetalert2';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import bgimage from '../../assets/farm.png'
import '../../App.scss';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';


const SellerRegister = () => {
  const [file, setFile] = useState(null);
  const [swalProps, setSwalProps] = useState({});
  const [subject, setSubject] = useState("Registration Successful");
  const [message, setMessage] = useState('');
  const [sellerData, setSellerData] = useState({
    name: '',
    email: '',
    password: '',
    contactInformation: '',
    address: '',
    paymentInformation: '',
    profile: file,
  });

const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value ,files} = e.target;
    setSellerData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'file') {
      const inputFile = files[0];
      const data = new FileReader();
      data.onload = () => {
        setFile(data.result);
        console.log(data.result);
      }
        data.readAsDataURL(inputFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // if (file) {
    //   const filename = Date.now() + file.name;
    //   formData.append("name", filename);
    //   formData.append("file", file);
    //   try {
    //     await axios.post("http://localhost:5002/backend/upload", formData);
    //     sellerData.profile = filename;
    //   } catch (err) {
    //     console.error('Error uploading file:', err);
    //   }
    // }
    try {
      const res = await axios.post("/backend/seller/add", sellerData);
      console.log(res.data.email);
    
      const welcomeMessage = `Hello, ${res.data.name}.  Welcome to our website. On becoming Seller We are humbly thanking you`;
      setMessage(welcomeMessage);

      // await axios.post("http://localhost:5002/backend/Mail/send-email", {
      //   to: res.data.email,
      //   subject,
      //   text: welcomeMessage 
      // });
      setSwalProps({
        show: true,
        icon: 'success',
        title: 'Successful',
        text: 'Seller Registered Successfully',
        confirmButtonColor: 'green',
      });

      setSellerData({
        name: '',
        email: '',
        password: '',
        contactInformation: '',
        address: '',
        paymentInformation: ''
      });
      navigate('/sellerlogin')

    } catch (err) {
      console.error('Error adding seller:', err);
      toast.error("Failed to add seller");
    }
  };

  return (
    <>
    <NavBar />
    <div className='d-flex flex-column justify-content-center rounded border' 
    style={{
      backgroundImage:`url(${bgimage})`,
      backgroundSize:'cover',
      objectFit:'fill'
      }}>
      
      <div className='d-flex flex-column flex-md-row col-13  justify-content-center blur-2'>
      <div className='col-5 mx-auto col-md-6'>
        <SweetAlert2 {...swalProps} />
      <img src={bgimage} alt="iamge" className='shadd'/>
      </div>

      <div className='col-12 col-md-4 rounded blur d-flex justify-content-center'>
      <form className=" rounded m-2 form col-12 " onSubmit={handleSubmit} style={{
        color:'black',
      }}>
        <center><h1>Seller Registration</h1></center>
        <center className='m-2'>
            <label htmlFor="img" className="form-label">
              {/* <Avatar size={150} src={file && URL.createObjectURL(file)} icon={<UserOutlined />} /> */}
              <Avatar size={150} src={file} icon={<UserOutlined />} />

            </label>
          </center>
        <div className="m-1">
          <label htmlFor="img" className="form-label">Profile</label>
          <input type="file" className="form-control col-10 ms-5" name="file" id="img" onChange={handleChange} />
        </div>
        <div className="m-1">
          <label htmlFor="inputname" className="form-label">Name</label>
          <input type="text" name="name" value={sellerData.name} onChange={handleChange} className="form-control col-10 ms-5" id="inputname" />
        </div>
        <div className="m-1">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="text" name="email" value={sellerData.email} onChange={handleChange} className="form-control col-10 ms-5" id="inputEmail4" />
        </div>
        <div className="m-1">
          <label htmlFor="inputAddress2" className="form-label">Mobile</label>
          <input type="text" name="contactInformation" value={sellerData.contactInformation} onChange={handleChange} className="form-control col-10 ms-5" id="inputAddress2" placeholder="" />
        </div>
        <div className="m-1">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type='text' name="address" value={sellerData.address} onChange={handleChange} className="form-control  col-10 ms-5" id="inputAddress" placeholder="1234 Main St" />
        </div>
        {/* <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">Payment Information</label>
          <input type="text" name="paymentInformation" value={sellerData.paymentInformation} onChange={handleChange} className="form-control" id="inputZip" />
        </div> */}
        <div className="m-1">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" value={sellerData.password} onChange={handleChange} className="form-control col-10 ms-5" id="password" />
        </div>
        <div className="col-12 d-flex justify-content-center w-100 p-2">
          <button type="submit" className="btn btn-success btn-sm m-1">Sign Up</button>
          <button type="reset" className="btn btn-warning btn-sm m-1">Reset</button>
        </div>
      </form>
      </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default SellerRegister;
