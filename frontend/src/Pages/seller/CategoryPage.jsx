import axios from 'axios';
import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import Panel from '../../Components/Panel';
import SweetAlert2 from 'react-sweetalert2';
import { useCategory } from '../../middleware/Hooks';
import Swal from 'sweetalert2';

const CategoryPage = () => {
  const [category, setCategory] = useState("");
  const [cat] = useCategory(); 
  const [swalProps, setSwalProps] = useState({});
  const [preview, setPreview] = useState(null);
  const [file,setFile] = useState(null)
  

  const handleFileChange = (e) => {
    const fileImg = e.target.files[0];
    if (fileImg) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(fileImg);
      setFile(fileImg);
    }
  };
  

  const addCategory = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire('Error', 'Please select an image file', 'error');
      return;
    }

    try {
      const userData = {
        name: category,
        img: preview 
      };

      const resp = await axios.post('/backend/category/cat', userData);
      if (resp.status === 200) {
        setSwalProps({
          show: true,
          icon: 'success',
          title: 'Success!',
          text: 'Category Added Successfully',
        });
        window.location.reload(false);
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire('Error', 'Something went wrong while adding the category', 'error');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`/backend/category/category/${id}`);
      Swal.fire({
        title: 'Deleted!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "green"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(false);
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response ? error.response.data.message : 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: "red",
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your category is safe :)',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  };

  return (
    <>
      <NavBar />
      <SweetAlert2 {...swalProps} />
      <div className="Category p-0">
        <div className="row m-2">
          <div className="col-md-3 p-0 gap-0">
            <Panel />
            <div  className="card mx-2 p-0">
              <div  className="card-title bg-body-secondary text-center">
                <h5>Add New Categories</h5>
              </div>
              <div  className="card-body">

                <form className='' onSubmit={addCategory}>
                 { preview && <div className="preview mx-auto border m-2" style={{width:'120px',height:'120px',borderRadius:'50%',overflow:'hidden',objectFit:'cover'}}>
                    <img src={preview} alt="log" style={{width:'100%',height:'100%'}}/>
                  </div>
                  }
                  <div className="d-flex col-md-12 col-sm-10 m-2">
                    <label htmlFor="dp"></label>
                  <input type="file" className='form-control ' name="dp" id="dp" onChange={handleFileChange} required/>
                  </div>
                  <div className='d-flex col-md-12 col-sm-10 m-2'>
                  <input
                    type="text"
                    className="form-control me-2"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder='Category Name'
                  />
                  <button type='submit' className="btn btn-outline-success px-5">
                    <i className='fa-solid fa-plus'></i>
                  </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="head">
              <div  className="card-title bg-body-secondary d-flex justify-content-between align-items-center px-2 rounded">
                <h3>Categories</h3>
                <><p>Total Count: </p><h4 className='text-center'>{cat?.length}</h4></>
              </div>
              <div className="list-group">
              {cat?.map(p => (
                  <div className="list-group-item list-group-item-action d-flex m-0 justify-content-between design" key={p._id}>
                    <span className='d-flex align-items-center gap-3'>
                      <div className='scale-up design' style={{ width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover',overflow:'hidden'}}>
                      {p.img && <img src={p.img} alt={p.name} style={{ width: '100%',height:'100%' }} />}
                      </div>
                      {p.name}
                    </span>
                    <span onClick={() => confirmDelete(p._id)} className='btn btn-outline-danger'>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
