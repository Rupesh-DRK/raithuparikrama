import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Avatar } from 'antd';
import 'sweetalert2/src/sweetalert2.scss';
import { UserOutlined } from '@ant-design/icons';
import NavBar from '../../Components/NavBar';

const UserReg = () => {
  // const fileInputRef = useRef(null);
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const inputFile = files[0];
      const data = new FileReader();
      data.onload = () => {
        setFile(data.result);
        console.log(data.result);
      }
      if(inputFile){
        data.readAsDataURL(inputFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

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
   

    // if (file) {
    //   const filename = Date.now() + file.name;
    //   formData.append("name", filename);
    //   formData.append("file", file);
    //   try {
    //     await axios.post("http://localhost:5002/backend/upload", formData);
    //     userData.profile = filename;
    //   } catch (err) {
    //     console.error('Error uploading file:', err);
    //     Swal.fire('Error', 'File upload failed', 'error');
    //     return;
    //   }
    // }

    try {
      const res = await axios.post('/backend/user/register', userData);
      console.log(res.data.email)
      
      const welcomeMessage = `Hello, ${res.data.username}.  Welcome to our website. On becoming a part of out community, We are humbly thanking you`;
      setMessage(welcomeMessage);

      // await axios.post("http://localhost:5002/backend/Mail/send-email", {
      //   to: res.data.email,
      //   subject,
      //   text: welcomeMessage 
      // });
      Swal.fire('Success', 'User added successfully', 'success');
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
    // fileInputRef.current.value = '';
    setFile(null);
  };

  return (
    <>
    <NavBar />
    <div className="container m-1 d-flex flex-column col-12 mx-auto col-md-6">
      <h1 className="m-1 text-center">User Registration</h1>
      <form onSubmit={handleSubmit} className="needs-validation col-12 mx-auto col-md-9 " noValidate>
        <div className="m-1">
          <center className='m-3'>
            <label htmlFor="img" className="form-label">
              <Avatar size={150} src={file} icon={<UserOutlined />} />
              {/* <Avatar size={150} src={file && URL.createObjectURL(file)} icon={<UserOutlined />} /> */}
            </label>
          </center>
          <input
            className="form-control col-12"
            type="file"
            name="file"
            id="img"
            // ref={fileInputRef}
            onChange={handleChange}
          />
        </div>
        <div className="m-1">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            className="form-control col-10 ms-5"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            ref={usernameRef}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control col-10 ms-5"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="Dob" className="form-label">Date of Birth</label>
          <input
            className="form-control col-10 ms-5"
            type="date"
            name="Dob"
            id="Dob"
            placeholder="Date of Birth"
            ref={dobRef}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="Gender" className="form-label">Gender</label>
          <select
            className="form-select  col-10 ms-5"
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
        <div className="m-1">
          <label htmlFor="mobile" className="form-label">Mobile</label>
          <input
            className="form-control col-10 ms-5"
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile"
            ref={mobileRef}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="Alternative_mobile" className="form-label">Alternative Mobile</label>
          <input
            className="form-control col-10 ms-5"
            type="text"
            name="Alternative_mobile"
            id="Alternative_mobile"
            placeholder="Alternative Mobile"
            ref={alternativeMobileRef}
          />
        </div>
        <div className="m-1">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className="form-control col-10 ms-5"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>
        <div className="col-12 d-flex justify-content-center">
        <button type="submit" className="btn btn-primary btn-sm w-25 ">Register</button>

        </div>
      </form>
    </div>
    </>
  );
};

export default UserReg;
