import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import NavBar from '../../Components/NavBar';

const UpdateUser = () => {
  const navigate = useNavigate();
  const[ Loading, setLoading ] = useState(false)
const[auth,setAuth]=useAuth()
  const [file, setFile] = useState(null);

  const [updateData, setUpdateData] = useState({
    username: auth.user.username || '',
    email: auth.user.email || '',
    Dob: auth.user.Dob ? new Date(auth.user.Dob).toISOString().split('T')[0] : '',
    Gender: auth.user.Gender || '',
    mobile: auth.user.mobile || '',
    Alternative_mobile: auth.user.Alternative_mobile || '',
    type: auth.user.type || '',
    password: auth.user.password || '',
    profile: auth.user.profile || '',
  });
  


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const inputFile = files[0];
      const data = new FileReader();
      data.onload = () => {
        setFile(data.result);
        setUpdateData(prevData => ({...prevData,profile:data.result}))
      }
      data.readAsDataURL(inputFile);
    }
     else {
      setUpdateData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put( `/backend/user/${auth.user._id}`, updateData);
      toast.success("Updated successfully");
     
    const newAuth = { ...auth, user: response.data };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
    setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err);
    }
  };
  return (<>
      <NavBar />
      <h2 className=" me-4" style={{float:'right'}}><Link to="/" className="btn btn-outline-dark"><i className="fa-solid fa-x"> </i></Link></h2>
    <div className="container m-1 d-flex flex-column col-12 mx-auto col-md-6">
      <ToastContainer />
      <h2 className="m-1 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className='col-12 mx-auto col-md-9 '>
        <center>
          <Avatar
            size={150}
            src={file || auth.user.profile || null} 
            icon={<UserOutlined />}
          />
        </center>
        <div className="form-group">
          <label htmlFor="img" className="form-label">Profile</label>
          <input type="file" className="form-control" name="file" id="img" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control col-10 ms-5"
            name="username"
            value={updateData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control col-10 ms-5"
            name="email"
            value={updateData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control col-10 ms-5"
            name="Dob"
            value={updateData.Dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            className="form-control col-10 ms-5"
            name="Gender"
            value={updateData.Gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            className="form-control col-10 ms-5"
            name="mobile"
            value={updateData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Alternative Mobile</label>
          <input
            type="text"
            className="form-control col-10 ms-5"
            name="Alternative_mobile"
            value={updateData.Alternative_mobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            className="form-control col-10 ms-5"
            name="type"
            value={updateData.type}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control col-10 ms-5"
            name="password"
            required
            value={updateData.password}
            onChange={handleChange}
          />
        </div>
        <div className='d-flex justify-centent-center'>
        <button type="submit" className="btn btn-success w-25 mx-auto">{Loading?"Updating...":"Update"}</button>
        </div>
      </form>
    </div>
    </>

  );
};

export default UpdateUser;
