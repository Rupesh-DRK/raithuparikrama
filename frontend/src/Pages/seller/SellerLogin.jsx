import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from "../../context/Auth";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../App.scss';
import bgimage from '../../assets/bg3.png'
import NavBar from '../../Components/NavBar';

const SellerLogin = () => {
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/backend/seller/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate(location.state || "/");
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
      });
    }
  };

  return (
    <>
    <div className='d-flex flex-column justify-content-center w-100 h-100 border' 
    style={{
      backgroundImage: `url(${bgimage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
    }}
    > 
    <NavBar />

      <form onSubmit={handleSubmit} className='form m-auto rounded-4 p-3 blur col-11 col-md-4' >
      <center><h1>Login</h1></center>
        <div className="col-12">
          <label className='form-label' htmlFor='mail'>Email:</label>
          <input type="email" id="mail" className='form-control' ref={userRef} required />
        </div>

        <div className="col-12">
          <label className='form-label' htmlFor='pwd'>Password:</label>
          <input type="password" className='form-control' id="pwd" ref={passwordRef} required />
        </div>

        <div className="col-12 align-items-center d-flex m-2">
          <button type="submit" className='btn btn-success p-2 mx-auto w-50'>Login</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default SellerLogin;
