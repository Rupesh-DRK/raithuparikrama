import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import DashboardPanel from './DashboardPanel';

const SellerApproval = () => {
    const [sellers, setSellers] = useState([]);
    const fetchSellers = async () => {
        try {
            const result = await axios.get("/backend/seller/allSellers");
            setSellers(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []); 

    const disapproveSeller = async (id) => {
        
        try {
            await axios.post(`/backend/seller/disapprove/${id}`);
            fetchSellers();
            
        } catch (error) {
            console.log(error);
        }
    };

    const approveSeller = async (id) => {
        
        try {
            await axios.post(`/backend/seller/approve/${id}`);
            fetchSellers();
            
        } catch (error) {
            console.log(error);
        }
    };

    const notifyDispproval = async (id) => {  
        try {
            await axios.post(`/backend/seller/notify-disapproval/${id}`);
            fetchSellers();   
        } catch (error) {
            console.log(error);
        }
    };
    const notifyApproval = async (id) => {   
        try {
            await axios.post(`/backend/seller/notify-approval/${id}`);
            fetchSellers();
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <>
        <NavBar />
        <div className='col-12 row'>
          <div className='col-12 col-md-3'>
            <DashboardPanel/>
          </div>
          <div className='col-12  col-md-9' style={{overflowX:'auto'}}> 
            <table  className='table table-hover m-1 p-1'>
             <thead>
                <tr className='p-1 m-1' >
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Accept/Reject</th>
                    <th> Notify ? </th>
                    
                </tr>
             </thead>
             <tbody>
                {sellers.map((seller,index) => (
                    <tr key={seller._id} className='m-0' >
                        <td>{index}</td>
                        <td>{seller.name}</td>
                        <td>{seller.email}</td>
                        <td>{seller.approval}</td>
                        <td> { seller.approval === "approved" ? 
                        <button  className='btn btn-sm btn-danger w-100'type='button' onClick={() => disapproveSeller(seller._id)}>Dissapprove</button> :
                         <button className='btn btn-sm btn-success w-100' type='button' onClick={() => approveSeller(seller._id)} >Approve</button> }
                         </td>

                        <td>
                            {seller.notify === "yes" ?
                        <button  className='btn-sm  btn btn-danger w-100' type='button' onClick={() => notifyDispproval(seller._id)}> NO </button>
                            :                                
                        <button className='btn btn-sm btn-success w-100' type='button' onClick={() => notifyApproval(seller._id)} > YES </button>
                            }
                        </td>
                         <td>{seller.password}</td>
                        
                        
                    </tr>
                ))}
             </tbody>
            </table>
          </div>
        </div>
        </>

    );
};

export default SellerApproval;
