import React from 'react'
import "../App.scss"
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='footer d-flex p-2 card '>
        <div className=" m-1 rounded col-12 justify-content-around d-flex align-items-center"> 
        <div className="link btn bg-dark btn-sm justify-content-center d-flex col-2"><Link to="/register">Become a Seller</Link></div>
            <p className='my-auto'>TOOLS LOGO</p>
          </div>
        <div className='d-flex flex-wrap m-0 col-12'>
            <div className='col-6'>
              <h3>Quick Links</h3>
              <div className='d-flex flex-column'>
                  <Link to={'/userreg'} >Register</Link>
                  <Link to={'/userlogin'} >Login</Link>
              </div>
            </div>
            <div className='col-6 align-self-end'>
              <h3>About Us</h3>
              <div className=' m-0 p-0 '>
            <strong>Developed by :</strong><p>Msc Frustated Students</p>
                       @KACHHA_gang-bolte
            </div>
            </div>
            <div className='col-12 text-center'>
              <h3>Contact Us:</h3>
              <div className="d-flex flex-wrap mx-auto justify-content-evenly" style={{fontSize:'1.5em' }}>
            <Link to=""><i className="fa-brands fa-instagram m-1" style={{ color:'pink'}} ></i></Link>
            <Link to=""><i className="fa-brands fa-facebook-f m-1"style={{ color:'blue'}} ></i></Link>
            <Link to=""><i className="fa-brands fa-linkedin-in m-1"style={{ color:'#0077b5'}} ></i></Link>
            <Link to=""><i className="fa-regular fa-envelope m-1"style={{ color:'red'}} ></i></Link>
            </div>
            </div>
            <div className=' col-12 text-center m-0 p-0 '>
            <strong>Developed by :</strong><p>Msc Frustated Students</p>
                       @KACHHA_gang-bolte
            </div>
        </div>
        
        

        
    </div>
  )
}

export default Footer
