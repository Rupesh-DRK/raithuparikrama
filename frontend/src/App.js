import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Index from './Pages/Index';
import SingleProduct from './Pages/SingleProduct';
import SellerRegister from './Pages/seller/SellerRegister';
import SellerLogin from './Pages/seller/SellerLogin';
import UserLogin from './Pages/User/UserLogin';
import UserReg from './Pages/User/UserReg';
import AddProduct from './Pages/Products/AddProduct';
import UpdateSeller from './Pages/seller/UpdateSeller';
import UpdateProducts from './Pages/Products/UpdateProducts';
import SellerProducts from './Pages/seller/SellerProducts';
import PrivateRoute from './routes/sellerRoute';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/adminRoutes';
import Page from './Pages/Page';
import SearchResults from './Pages/SearchResults';
import CartPage from './Pages/CartPage';
import UpdateUser from './Pages/User/UpdateUser';
import CategoryPage from './Pages/seller/CategoryPage';
import { useAuth } from './context/Auth';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';  // Import SweetAlert2
import CategoryProducts from './Pages/CategoryProducts';
import DashBoard from './Pages/Admin/DashBoard';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminRegister from './Pages/Admin/AdminRegistration';
import SellerApproval from './Pages/Admin/SellerApproval';
import AllOrders from './Pages/Admin/AllOrders';
import UploadProducts from './Pages/Admin/UploadProducts';
import AddCategory from './Pages/Admin/AddCategory';
import ProductForm from './Pages/Admin/ProductForm';
import AllSkeletons from './Skeletons/AllSkeletons';




function App() {
  const [auth, setAuth] = useAuth();
  const location = useNavigate()
  
  useEffect(() => {
    if (auth.token) {
      const token = auth.token;
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      // const expirationTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', expirationTime);

      const checkTokenExpiry = () => {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = Date.now();
        if (currentTime > tokenExpiration) {
          logoutUser();
          location('/');
        }
      };

      const logoutUser = () => {
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          setAuth({
            ...auth,
            user: null,
            token: "",
          });
          localStorage.removeItem("auth");
        });
      };

      const intervalId = setInterval(checkTokenExpiry, 1000); // Check every minute
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [auth.token]);
console.log(Date.now())
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<Index />} />
        <Route path="/register" element={<UserReg />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:category" element={<CategoryProducts/>} />
      <Route path="/user" element={<UserRoutes />}>
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/UpdateUser" element={<UpdateUser />} />
      </Route>
      <Route path="/seller" element={<PrivateRoute />}>
          <Route path="/seller/add" element={<AddProduct />} />
          <Route path="/seller/updateSeller" element={<UpdateSeller />} />
          <Route path="/seller/updateProducts/:productId" element={<UpdateProducts />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/CategoryPage" element={<CategoryPage />} />
      </Route>
      
        <Route path="/sellerRegister" element={<SellerRegister />} />
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/userreg" element={<Register />} />
        <Route path="*" element={<Page />} />
        <Route path="/Dash" element={<DashBoard/> } />

        <Route path='/admin/login' element={ <AdminLogin />}/>
        <Route path='/admin/register' element={ <AdminRegister />}/>
      
      <Route path='/admin' element={<AdminRoutes />}>
        <Route path='/admin/dashboard' element={ <DashBoard />}/>
        <Route path='/admin/approvals' element={ <SellerApproval /> } />
        <Route path='/admin/orders' element={ <AllOrders /> } />
        <Route path='/admin/add' element={ <UploadProducts /> } />
        <Route path='/admin/cate' element={ <AddCategory /> } />
        <Route path='/admin/newForm' element={<ProductForm />} />
      </Route>
      <Route path='/skel' element={<AllSkeletons />} />

    </Routes>
    </div>
  );
}

export default App;
