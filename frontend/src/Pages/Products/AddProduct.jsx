import axios from 'axios';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SweetAlert2 from 'react-sweetalert2';
import { useCategory } from '../../middleware/Hooks';
import NavBar from '../../Components/NavBar.jsx';
import { useAuth } from '../../context/Auth';
import Panel from '../../Components/Panel.jsx';

const AddProduct = () => {
  const [auth] = useAuth();
  const [cate] = useCategory();
  const [fileInputs, setFileInputs] = useState([0]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [swalProps, setSwalProps] = useState({});
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    profile:[],
    quantityAvailable: '',
    category: '',
    seller: auth.user._id,  
  });
  const addFileInput = () => {
    if (fileInputs.length < 5) {
      setFileInputs([...fileInputs, fileInputs.length]);
    } else {
      setSwalProps({
        show: true,
        icon: 'warning',
        title: 'Limit Reached',
        text: 'You can only add up to 5 images',
      });
    }
  };

  const removeFileInput = (index) => {
    const updatedFileInputs = fileInputs.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedProfile = productData.profile.filter((_, i) => i !== index);

    setFileInputs(updatedFileInputs);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setProductData({ ...productData, profile: updatedProfile });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newFiles = [...files];
      const newPreviews = [...previews];

      newFiles[index] = file;
      newPreviews[index] = reader.result;

      setFiles(newFiles);
      setPreviews(newPreviews);
      setProductData(prevData => ({
        ...prevData,
        profile: newPreviews,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      setProductData(prevData => ({
        ...prevData,
        [name]: value,
      }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      category: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.category) {
      setSwalProps({
        show: true,
        icon: 'warning',
        title: 'Error',
        text: 'Please select a category',
      });
      return;
    }

    try {
      const response = await axios.post("/backend/product/addProduct", productData);
      console.log('Product added successfully:', response.data);
      setSwalProps({
        show: true,
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully',
      });

      setFiles([]);
      setPreviews([]);
      setFileInputs([0]);
    } catch (error) {
      console.error('Error posting product:', error);
      setSwalProps({
        show: true,
        icon: 'error',
        title: 'Error!',
        text: 'Error adding product',
      });
    }
    console.log(productData.profile);
  };

  const settings = {
    dots: true,
    infinite: previews.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <>
    <NavBar />
    <div className="col-12 d-md-flex">
        <div className="col-12 col-md-3">
          <Panel />
        </div>
        <div className="col-12 col-md-9">
        <div className='d-flex flex-column justify-content-center col-12 flex-md-row'>
          <div className='preview d-flex flex-column justify-content-center align-items-center m-1 col-md-5 col-12'>
              {previews.length > 0 ? (
          <div className='m-1 w-100' style={{ width: '30vw' }}>
            <Slider {...settings}>
              {previews.map((preview, index) => preview && (
                <div key={index} className='d-flex justify-content-center align-items-center'>
                  <img src={preview} alt={`preview-${index}`} style={{ height: 'auto', width: '90%' }} />
                </div>
              ))}
            </Slider>
          </div>
              ) : (
                <center><h2>Upload Images to see Previews</h2></center>
              )}
          </div>
      <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-md-center  col-12 col-md-7 '>
        <SweetAlert2 {...swalProps} />
        <div className='justify-content-center align-items-center' style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', width: '100%' }}>
          {fileInputs.map((input, index) => (
            <div key={index} className="d-flex justify-content-center align-items-center">
              <div className="d-flex">
                <input
                  className='form-control'
                  type="file" 
                  name={`file${index + 1}`}
                  id={`file${index + 1}`}
                  accept='image/*'
                  onChange={(e) => handleFileChange(e, index)}
                />
                <button type='button' className='btn btn-danger m-1 py-1' onClick={() => removeFileInput(index)}>X</button>
              </div>
            </div>
          ))}
        </div>

        <button type='button' className='btn btn-primary mx-auto p-1' onClick={addFileInput}>Add More</button>

        <div className="m-1">
          <label htmlFor="name" className="form-label col-3">Name:</label>
          <input
            type="text"
            className="form-control ms-5 col-11"
            id="name"
            name="name" 
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="description" className="form-label col-3">Description:</label>
          <input
            type="text"
            className="form-control ms-5 col-11"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="price" className="form-label col-3">Price:</label>
          <input
            type="number"
            className="form-control ms-5 col-11"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="quantityAvailable" className="form-label col-3">Quantity Available:</label>
          <input
            type="number"
            className="form-control ms-5 col-11"
            id="quantityAvailable"
            name="quantityAvailable"
            value={productData.quantityAvailable}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-1">
          <label htmlFor="category" className="form-label col-3">Category:</label>
          <select className="form-select ms-5 col-11" id="category" onChange={handleCategoryChange} value={productData.category} required>
            <option value="" disabled>Select a category</option>
            {cate?.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success mx-auto">Submit</button>
      </form>
    </div>
    </div>
    </div>
  
  </>
  );
};

export default AddProduct;
