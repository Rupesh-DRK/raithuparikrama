import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import NavBar from '../../Components/NavBar';

const UpdateUser = () => {
  const pf = "http://localhost:5002/backend/images/";
  const navigate = useNavigate();
const[auth,setAuth]=useAuth()
  const [file, setFile] = useState(null);

  const [updateData, setUpdateData] = useState({
    username: '',
    email: '',
    Dob: '',
    Gender: '',
    mobile: '',
    Alternative_mobile: '',
    type: '',
    password: '',
  });

  useEffect(() => {
    if (auth.user) {
      setUpdateData({
        username: auth.user.username || '',
        email: auth.user.email || '',
        Dob: auth.user.Dob ? new Date(auth.user.Dob).toISOString().split('T')[0] : '',
        Gender: auth.user.Gender || '',
        mobile: auth.user.mobile || '',
        Alternative_mobile: auth.user.Alternative_mobile || '',
        type: auth.user.type || '',
        password:""
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files[0]);
    } else {
      setUpdateData(prevData => ({
        ...prevData,
        [name]: value,
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
        updateData.profile= filename
      } catch (err) {
        console.error("File upload failed:", err);
      }
    }
console.log(updateData)
    try {
      const response = await axios.put(`http://localhost:5002/backend/user/${auth.user._id}`, updateData);
      toast.success("Updated successfully");
     
    // Update auth in state and localStorage
    const newAuth = { ...auth, user: response.data };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err);
    }
  };
{console.log(auth.user.profile)}
  return (<>
      <NavBar />
    <div className="container m-1 d-flex flex-column col-12 mx-auto col-md-6">
      <ToastContainer />
      <h2 className="m-1 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className='col-12 mx-auto col-md-9 '>
        <center>
          <Avatar
            size={150}
            src={pf+auth.user.profile}
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
        <button type="submit" className="btn btn-primary w-25 mx-auto">Submit</button>
        </div>
      </form>
    </div>
    </>

  );
};

export default UpdateUser;