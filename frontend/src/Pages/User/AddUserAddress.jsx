import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/Auth';
import { usePincode } from '../../middleware/Hooks';

const AddUserAddress = () => {
    const [auth] = useAuth();
    const [formData, setFormData] = useState({
        userId: auth.user._id,
        Name: '',
        Address: '',
        Village: '',
        PinCode: '',
        District: '',
        State: '',
        Country: 'India',
        Mobile: ''
    });

    const { pincodeData, error: pincodeError, fetchPincodeData } = usePincode();

    useEffect(() => {
        if (pincodeData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                Village: pincodeData.Name || '',
                District: pincodeData.District || '',
                State: pincodeData.State || '',
                Country: pincodeData.Country || ''
            }));
        }
    }, [pincodeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        if (name === 'PinCode' && value.length === 6) {
            fetchPincodeData(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userId, ...newAddress } = formData;

        try {
            await axios.post(`http://localhost:5002/backend/address/${auth.user._id}/add`, newAddress);
            Swal.fire({
                icon: 'success',
                title: 'Address added successfully',
                showConfirmButton: true,
                timer: 1500
            });
            window.location.href = '/user/UserAddress/';
        } catch (error) {
            console.error('There was an error adding the address!', error);
        }
    };

    return (
        <>
            <h2 className="mt-4 text-center">Add Address</h2>
            <div className="container p-3 m" style={{ border: "2px solid lightgrey", borderRadius: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9 mb-3">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 col-7 mb-3">
                            <label htmlFor="Address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Address"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-3 col-5 mb-3">
                            <label htmlFor="PinCode">PinCode</label>
                            <input
                                type="text"
                                className="form-control"
                                id="PinCode"
                                name="PinCode"
                                maxLength={6}
                                minLength={6}
                                value={formData.PinCode}
                                onChange={handleChange}
                                required
                            />
                            {pincodeError && <small className="text-danger">{pincodeError}</small>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-6 mb-3">
                            <label htmlFor="Village">Village</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Village"
                                name="Village"
                                value={formData.Village}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-3 col-5 mb-3">
                            <label htmlFor="District">District</label>
                            <input
                                type="text"
                                className="form-control"
                                id="District"
                                name="District"
                                value={formData.District}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-6 mb-3">
                            <label htmlFor="State">State</label>
                            <input
                                type="text"
                                className="form-control"
                                id="State"
                                name="State"
                                value={formData.State}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 col-6 mb-3">
                            <label htmlFor="Country">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Country"
                                name="Country"
                                value={formData.Country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="Mobile">Mobile</label>
                            <input
                                type="number"
                                className="form-control"
                                id="Mobile"
                                name="Mobile"
                                value={formData.Mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <center>
                        <button type="submit" className="btn btn-primary col-md-8 col-12 mt-2">Add Address</button>
                    </center>
                </form>
            </div>
        </>
    );
};

export default AddUserAddress;
