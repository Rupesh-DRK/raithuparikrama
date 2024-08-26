import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Avatar } from 'antd';
import 'sweetalert2/src/sweetalert2.scss';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserReg = () => {
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const dobRef = useRef('');
  const genderRef = useRef('');
  const mobileRef = useRef('');
  const alternativeMobileRef = useRef('');
  const passwordRef = useRef('');
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("Registration Successful");
  const [message, setMessage] = useState('');

  const navigate = useNavigate()



  const handleFileChange = (e) => {
    const inputFile = e.target.files[0];
    const reader = new FileReader(); 
    reader.onload = () =>{
      setFile(reader.result);
      
    };
    if(inputFile) {
    reader.readAsDataURL(inputFile);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      Dob: dobRef.current.value,
      Gender: genderRef.current.value, 
      mobile: mobileRef.current.value,
      Alternative_mobile: alternativeMobileRef.current.value,
      password: passwordRef.current.value,
      profile:file,
    };

console.log(userData)
    try {
      const res = await axios.post('/backend/admin/register', userData);
      console.log(res.data.email)
      
      const welcomeMessage = `Hello, ${res.data.username}.  Welcome to our website. On becoming a part of out community, We are humbly thanking you`;
      setMessage(welcomeMessage);

      // await axios.post("http://localhost:5002/backend/Mail/send-email", {
      //   to: res.data.email,
      //   subject,
      //   text: welcomeMessage 
      // });
      Swal.fire('Success', 'Admin added successfully', 'success');
      navigate("/admin/login");
      resetForm();
    } catch (error) {
      console.error('Registration failed:', error.response || error.message);
      Swal.fire('Error', 'Registration failed', 'error');
    }
  };

  const resetForm = () => {
    usernameRef.current.value = '';
    emailRef.current.value = '';
    dobRef.current.value = '';
    genderRef.current.value = '';
    mobileRef.current.value = '';
    alternativeMobileRef.current.value = '';
    passwordRef.current.value = '';
    setFile(null);
  };

  return (
    <div className="container mt-5 w-25 border rounded">
      <h1 className="mb-4">User Registration</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <center className='m-3'>
            <label htmlFor="img" className="form-label">
              {/* <Avatar size={150} src={file && URL.createObjectURL(file)} icon={<UserOutlined />} /> */}
              <Avatar size={150} src={file} icon={<UserOutlined />} />
            </label>
          </center>
          <input
            className="form-control"
            type="file"
            name="file"
            id="img"
            // ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            ref={usernameRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Dob" className="form-label">Date of Birth</label>
          <input
            className="form-control"
            type="date"
            name="Dob"
            id="Dob"
            placeholder="Date of Birth"
            ref={dobRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Gender" className="form-label">Gender</label>
          <select
            className="form-select"
            name="Gender"
            id="Gender"
            ref={genderRef}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile</label>
          <input
            className="form-control"
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile"
            ref={mobileRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Alternative_mobile" className="form-label">Alternative Mobile</label>
          <input
            className="form-control"
            type="text"
            name="Alternative_mobile"
            id="Alternative_mobile"
            placeholder="Alternative Mobile"
            ref={alternativeMobileRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-50 ">Sign Up</button>
        <button type="reset" className="btn btn-warning w-50" onClick={resetForm}>Reset</button>
      </form>
    </div>
  );
};

export default UserReg;
