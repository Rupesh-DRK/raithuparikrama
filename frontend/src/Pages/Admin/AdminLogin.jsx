import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../Components/NavBar';
import bgimage from '../../assets/bg3.png'


const UserLogin = () => {
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (auth?.user) {
            navigate("/admin/dashboard/", { replace: true });
        }
    }, [auth, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/backend/admin/login", {
                email: userRef.current.value,
                password: passwordRef.current.value,
            });
            
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/admin/dashboard", { replace: true });
        } catch (err) {
            console.error('Login failed:', err);
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
        <div className='col-12 m-0 p-0'>
        <NavBar />
        </div>
        {/* <div className="form col-12 col-md-13 "> */}

            <form onSubmit={handleSubmit} className="needs-validation form m-auto rounded-4 p-3 blur col-10 col-md-3" noValidate>
            <h1 className="text-center col-12">Admin Login</h1>

                <div className=" col-12">
                    <label htmlFor="email" className="form-label m-0 col-12">Email:</label>
                    <input
                        type="email"
                        className="form-control ms-4 col-10"
                        id="email"
                        ref={userRef}
                        required
                    />
                </div>
                <div className=" col-12">
                    <label htmlFor="password" className="form-label m-0 col-12">Password:</label>
                    <input
                        type="password"
                        className="form-control ms-4 col-10"
                        id="password"
                        ref={passwordRef}
                        required
                    />
                </div>
                <div className=' col-12 d-flex my-2'>
                <button type="submit" className="btn btn-primary btn-sm m-auto">Sign In</button>
                </div>
            </form>
            </div>
            
        {/* </div> */}
        </>
    );
};

export default UserLogin;
