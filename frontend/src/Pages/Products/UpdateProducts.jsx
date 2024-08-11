import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Panel from '../../Components/Panel';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useCategory } from "../../middleware/Hooks";
import { useAuth } from '../../context/Auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import NavBar from '../../Components/NavBar';

const UpdateProducts = () => {
    const [auth, setAuth] = useAuth();
    const pf = "/backend/images/";
    const [files, setFiles] = useState([null, null, null, null, null]);
    const [previews, setPreviews] = useState([null, null, null, null, null]);
    const navigate = useNavigate();
    const [categories, setCategories] = useCategory();
    const [updateData, setUpdateData] = useState({
        name: '',
        description: '',
        price: '',
        quantityAvailable: '',
        category: '',
        seller: auth.user._id,
        profile: []
    });

    const location = useLocation();
    const path = location.pathname.split('/')[3];
    const [product, setProduct] = useState({});
    const [sellerData, setSellerData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:5002/backend/product/${path}`);
                setProduct(productResponse.data);
                
                if (productResponse.data.profile) {
                    setPreviews(productResponse.data.profile.map(file => `${pf}${file}`));
                }

                const sellerResponse = await axios.post('http://localhost:5002/backend/seller/sel', { _id: productResponse.data.seller });
                setSellerData(sellerResponse.data);

                setUpdateData(prevData => ({
                    ...prevData,
                    ...productResponse.data,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [path]);

    const handleChange = (e) => {
        const { name, value, files: inputFiles } = e.target;
        if (name.startsWith('file')) {
            const index = parseInt(name.replace('file', '')) - 1;
            const file = inputFiles[0];
            const newFiles = [...files];
            newFiles[index] = file;
            setFiles(newFiles);

            const newPreviews = [...previews];
            newPreviews[index] = URL.createObjectURL(file);
            setPreviews(newPreviews);
        } else {
            setUpdateData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setUpdateData(prevData => ({
            ...prevData,
            category: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const filenames = [...updateData.profile];

        files.forEach((file, index) => {
            if (file) {
                const filename = Date.now() + file.name;
                filenames[index] = filename;
                formData.append("files", file, filename);
            }
        });

        setUpdateData(prevData => ({
            ...prevData,
            profile: filenames
        }));

        if (filenames.length > updateData.profile.length) {
            try {
                await axios.post("http://localhost:5002/backend/uploads", formData);
                
            } catch (err) {
                console.error("File upload failed:", err);
                toast.error("File upload failed");
            }
        }

        try {
            await axios.put(`http://localhost:5002/backend/product/${path}`, {
                ...updateData,
                profile: filenames
            });
            toast.success("Updated successfully");
            setTimeout(() => {
                navigate("/seller/Products");
            }, 2000);
        } catch (err) {
            console.error("Update failed:", err);
            toast.error("Update failed");
        }
    };

    return (
        <>
            <NavBar />
            <div className="UpdateProducts ">
                <div className="row">
                    <div className="col-md-3"><Panel /></div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit} className="form">
                            <ToastContainer />
                            {[...Array(5)].map((_, index) => (
                                <div className="mb-3" key={index}>
                                    <label htmlFor={`file${index + 1}`} className="form-label">Profile {index + 1}</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name={`file${index + 1}`}
                                        id={`file${index + 1}`}
                                        onChange={handleChange}
                                    />
                                    {previews[index] && (
                                        <div className="d-flex justify-content-center m-2">
                                            <Avatar
                                                size={200}
                                                shape='square'
                                                src={previews[index]}
                                                icon={<UserOutlined />}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={updateData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={updateData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={updateData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantityAvailable" className="form-label">Quantity Available:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantityAvailable"
                                    name="quantityAvailable"
                                    value={updateData.quantityAvailable}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category:</label>
                                <select className="form-select" id="category" onChange={handleCategoryChange} value={updateData.category}>
                                    {categories?.map(c => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <input type="hidden" name="seller" value={auth.user._id} />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProducts;
