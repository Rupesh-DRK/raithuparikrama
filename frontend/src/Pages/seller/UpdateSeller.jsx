import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UpdateSeller = () => {
  const pf = "http://localhost:5002/backend/images/";

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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files[0]);
    } else {
      setUpdateData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      try {
        await axios.post("http://localhost:5002/backend/upload", data);
        setUpdateData(prevData => ({
          ...prevData,
          profile: filename
        }));
      } catch (err) {
        console.error("File upload failed:", err);
      }
    }

    try {
      const response = await axios.put("http://localhost:5002/backend/seller/" + auth.user._id, updateData);
      
      toast.success("Updated successfully");
     
    // Update auth in state and localStorage
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
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4"><Link to="/" className="btn btn-outline-dark me-5"><i className="fa-solid fa-x">  Cancel </i></Link>Update Seller</h2>
      <form onSubmit={handleSubmit}>
        <center>
          <Avatar 
            size={150} 
            src={file ? URL.createObjectURL(file) : (auth.user.profile ? pf+auth.user.profile : null)} 
            icon={<UserOutlined />} 
          />
        </center>
        <div className="form-group">
          <label htmlFor="img" className="form-label">Profile</label>
          <input type="file" className="form-control" name="file" id="img" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={updateData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={updateData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={updateData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Information</label>
          <input
            type="text"
            className="form-control"
            name="contactInformation"
            value={updateData.contactInformation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            className="form-control"
            name="address"
            value={updateData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Payment Information</label>
          <input
            type="text"
            className="form-control"
            name="paymentInformation"
            value={updateData.paymentInformation}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateSeller;
