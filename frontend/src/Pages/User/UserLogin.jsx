import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../Components/NavBar';
import UserReg from './UserReg';
import Footer from '../../Components/Footer';

const UserLogin = () => {
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (auth?.user) {
            navigate("/", { replace: true });
        }
    }, [auth, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post( "/backend/user/login", {
                email: userRef.current.value,
                password: passwordRef.current.value,
            });
            
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/", { replace: true });
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <>
        <NavBar />
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center" >
            <div className=" d-flex  col-8 col-md-7 justify-content-center m-0">
                <img src=" https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1723058854~exp=1723062454~hmac=ebf42fbb3c961de65a9567cc844eb4b27e79733bde4ed722bef04b7b55f06095&w=1380"
                style={{maxWidth:'100%',maxHeight:'auto',filter:'blur(1px',margin:2}} />
            </div>

            <form onSubmit={handleSubmit} className="needs-validation blur-lite justify-content-center col-12 col-md-4 mx-auto" noValidate>
            <h1 className="text-center">Login</h1>

                <div className="m-0">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="ms-5 col-10 form-control"
                        id="email"
                        ref={userRef}
                        required
                    />
                </div>
                <div className="m-0">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="ms-5 col-10  form-control"
                        id="password"
                        ref={passwordRef}
                        required
                    />
                </div>
                <div className='text-center m-2'>
                <Link  to={'/register'}>New User ? Register Here</Link>
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary btn-sm m-2">Login</button>
                <button type="reset" className="btn btn-warning btn-sm m-2">Reset</button>
                </div>
            </form> 
        </div>
        </>
    );
};

export default UserLogin;
