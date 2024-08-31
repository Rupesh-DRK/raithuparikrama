import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UpdateSeller = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [file, setFile] = useState(null);
  const [updateData, setUpdateData] = useState({
    userId: auth.user._id,
    name: auth.user.name,
    email: auth.user.email,
    password: auth.user.password,
    contactInformation: auth.user.contactInformation,
    address: auth.user.address,
    paymentInformation: auth.user.paymentInformation,
    profile: auth.user.profile,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const inputFile = files[0]
      const data = new FileReader();
      data.onload = () => {
        setFile(data.result);
        setUpdateData(prevData => ({...prevData,profile: data.result}));
      }
      data.readAsDataURL(inputFile);
    }
     else {
      setUpdateData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put( "/backend/seller/" + auth.user._id, updateData); 
      toast.success("Updated successfully");
    const newAuth = { ...auth, user: response.data };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container mt-4 col-12">
      <ToastContainer />
      <h2 className="" style={{float:'right'}}><Link to="/" className="btn btn-outline-dark"><i className="fa-solid fa-x"> </i></Link></h2>
      <form onSubmit={handleSubmit} className='col-12 col-md-6 col-lg-4 mx-auto'>
        <center><h2>Update Seller</h2></center>
        <center>
          <Avatar 
            size={150} 
            src={file || auth.user.profile || null} 
            icon={<UserOutlined />} 
          />
        </center>
        <div className="form-group">
          <label htmlFor="img" className="form-label"><strong>Profile</strong></label>
          <input type="file" className="form-control ms-4 col-11" name="file" id="img" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label><strong>Name</strong></label>
          <input
            type="text"
            className="form-control ms-4 col-11"
            name="name"
            value={updateData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label><strong>Email</strong></label>
          <input
            type="email"
            className="form-control ms-4 col-11"
            name="email"
            value={updateData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label><strong>Password</strong></label>
          <input
            type="password"
            className="form-control ms-4 col-11"
            name="password"
            value={updateData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label><strong>Contact Information</strong></label>
          <input
            type="text"
            className="form-control ms-4 col-11"
            name="contactInformation"
            value={updateData.contactInformation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label><strong>Address</strong></label>
          <textarea
            className="form-control ms-4 col-11"
            name="address"
            value={updateData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label><strong>Payment Information</strong></label>
          <input
            type="text"
            className="form-control ms-4 col-11 ms-4 col-11"
            name="paymentInformation"
            value={updateData.paymentInformation}
            onChange={handleChange}
          />
        </div>
        <center>
        <button type="submit" className="btn-sm btn btn-primary m-2">Submit</button>
        </center>
      </form>
    </div>
  );
};

export default UpdateSeller;
