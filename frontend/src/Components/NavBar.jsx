import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Drawer ,Badge} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SearchInput from './SearchInput';
import { useState } from 'react';
import { useAuth } from '../context/Auth';
import { useCategory } from '../middleware/Hooks';
import { useCart } from '../context/CartContext';
import "../App.scss"
import Logo from "../assets/logo.png"


function NavBar() {
  const pf = "/backend/images/";
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [cat, setCat] = useCategory();
  const [cart, setCart] = useCart();
  const [show,setShow] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setShow(false);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate('/');
  };

  return (
    <Navbar expand="lg" className=" d-block navbar p-2 m-2">       
      <div className='d-flex justify-content-center w-100'><Navbar.Brand as={Link} to="/"><div className='logo ms-4' style={{width:'200px'}}><img src={Logo} draggable={false}/></div></Navbar.Brand>  </div>
      <div className='d-inline-flex justify-content-between w-100 fluid m-0 p-1 border-bottom'>
       <div>
        <Navbar.Toggle aria-controls="navbarScroll m-1" onClick={()=> setShow(true)} />
        <Navbar.Collapse id="navbarScroll" >
        <Nav className="me-auto my-2 my-lg-0 d-none d-lg-flex" style={{ maxHeight: '100px' }}>
  <NavDropdown
    className='m-2'
    title="Menu"
    id="navbarScrollingDropdown"
    drop='down'
    style={{ zIndex: 4000,alignItems:'center'}}
  >
    <center><strong>
      <NavDropdown.Item as={Link} to="/" className='scale-up rounded col-11'>
    Home
    </NavDropdown.Item></strong></center>
    <center><strong>
   <NavDropdown
      className='m-2 scale-up'
      title="Categories"
      id="navbarScrollingDropdownCategories"
      drop='end'
      style={{ zIndex: 4001 }}
      align="end"
    >
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {cat?.map(c => (
          <NavDropdown.Item
            key={c._id}
            onClick={() => navigate(`/category/${c._id}`)}
          >
            <div className='btn btn-sm scale-up w-100 m-0 p-1'>
              {c.name}
            </div>
          </NavDropdown.Item>
        ))}
      </div>
    </NavDropdown></strong></center>

    <center>
    <NavDropdown.Item as={Link} to='/#about' className='scale-up col-11 rounded '>
      About Us
    </NavDropdown.Item></center>
  </NavDropdown>
</Nav>

          <Nav
            className="me-auto my-2 my-lg-0" 
            style={{ maxHeight: '100px' }} >
                 <Drawer title="Menu"  onClose={onClose} open={show} placement="left" width={300} className='d-lg-none'>
                  <div className="list-group flex-column gap-1">
                 <Link as={Link} to="/" className='scale-up rounded-2 list-group-item' >Home</Link> 
                 <Accordion className='m-0 p-0' defaultActiveKey="0">
                  <Accordion.Item eventKey='1'>
                   <Accordion.Header className='m-0 p-0 '>Categories</Accordion.Header>
                   <Accordion.Body className='m-0 p-0'>
                        {cat?.map(c => (
                          <Link
                           key={c._id}
                           to={`/category/${c._id}`}
                           className="list-group-item list-group-item-action p-2"
                           onClick={() => {
                            navigate(`/category/${c._id}`) ;
                            setShow(false)
                            }
                           }>
                           {c.name}
                          </Link>
                           ))
                        }
                    </Accordion.Body>
                  </Accordion.Item>
                  </Accordion>
                 <Link to='/#about' className='scale-up rounded-2 list-group-item' >About Us</Link>


                   </div>

                 </Drawer>

             
          </Nav>
         
        </Navbar.Collapse>
            </div>

              <div className='mb-1'>
                  <SearchInput /> 
              </div>
       <div>
       <div className="d-flex scale-up">
            {auth?.user ? (
              <>
               {auth.user.type === 'consumer' ? <>  <Badge count={cart ? cart.length : 0} showZero >
                   <Avatar onClick={showDrawer} size={40} icon={<UserOutlined />} src={auth.user.profile} />
                   </Badge></>:  <Avatar onClick={showDrawer} icon={<UserOutlined />} src={auth.user.profile} />}
              
              </>
            ) : (
              <Button className="btn" onClick={showDrawer}>Login</Button>
            )}
          </div>
       </div>
           
      </div>
      <Drawer title="User"  onClose={onClose} open={open} placement="right" width={320}>
        <div className="offcanvas-body">
          {auth && auth.user ? (
            <div className="box d-flex flex-column list-group">
              <center>
                <Avatar src={auth.user.profile} size={100} icon={<UserOutlined />} />
                <p>{auth.user.name || auth.user.username}</p>
              </center>
              
           
              {auth.user.type === 'consumer' && (
                <>
                <Link to="user/UpdateUser" className="list-group-item list-group-item-action"><i className="fa-solid fa-edit"></i> Edit</Link>
                <Link to="/user/cart" className="list-group-item list-group-item-action"><i className="fa-solid fa-cart-shopping"></i> Cart <Badge count={cart ? cart.length : 0} showZero /></Link>
                <Link to="/" className="list-group-item list-group-item-action"><i className="fa-solid fa-layer-group"></i> My Orders</Link>

                </>
              )}
              {auth.user.type === 'seller' && (
                <><Link to="/seller/UpdateSeller" className="list-group-item list-group-item-action"><i className="fa-solid fa-edit"></i> Edit</Link>
                <Link to="/seller/products" className="list-group-item list-group-item-action"> <i className='fa-solid fa-layer-group'></i> My Products</Link>
                <Link to="/seller/CategoryPage" className="list-group-item list-group-item-action"> <i className="fa-solid fa-list"></i>   Categories</Link>

                </>
              )}

              {auth.user.type === 'admin' && (
                <><Link to="/admin/dashboard" className="list-group-item list-group-item-action"><i className="fa-solid fa-edit"></i> dashboard</Link>
                <Link to="/admin/approvals" className="list-group-item list-group-item-action"> <i className='fa-solid fa-layer-group'></i> Approvals</Link>

                </>
              )}

              <a href="#" className="list-group-item list-group-item-action" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>  Logout</a>
            </div>
          ) : (
            <div className="box d-flex flex-column list-group">
              <Link to="/login" className="list-group-item list-group-item-action"><i className="fa-solid fa-right-to-bracket"></i>  User Login</Link>
              <Link to="/sellerlogin" className="list-group-item list-group-item-action"><i className="fa-solid fa-right-to-bracket"></i>  Seller Login</Link>
              <Link to="/admin/login" className="list-group-item list-group-item-action"><i className="fa-solid fa-right-to-bracket"></i>  Admin Login</Link>
            </div>
          )}
        </div>
      </Drawer>
    </Navbar>
  );
}

export default NavBar;
