import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import SweetAlert2 from 'react-sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Meta } = Card;

const Ant = (props) => {
  const [swalProps, setSwalProps] = useState({});
  
  const handleDelete = (p) => {
    setSwalProps({
      show: true,
      title: 'Are you sure?',
      text: 'Do you really want to delete this item? This process cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor:'red',
      cancelButtonText: 'No, keep it',
      reverseButtons: true,
      preConfirm: () => {
        return axios.delete( `/backend/product/${p}`)
          .then(() => {
            setSwalProps({
              show: true,
              icon: 'success',
              title: 'Deleted!',
              text: 'Item has been deleted.',
              confirmButtonColor: 'green',
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            setSwalProps({
              show: true,
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the item.',
            });
          });
      },
      willClose: () => {
        setSwalProps({});
      }
    });
  };

  return (
    <>
      <SweetAlert2 {...swalProps} />
      <Card 
        style={{ width:190,  objectFit: 'cover',margin:'8px',padding:0,objectPosition:'center' }}
        cover={
          <img className='m-1 rounded scale-up' src={props?.profile ? props.profile[0] : null}  style={{ width: 180, height:"13em", objectFit: 'cover' }} />
        }
        actions={[
          <Link to={`/seller/updateProducts/${props._id}`}><EditOutlined key="edit" /></Link>,
          <DeleteOutlined onClick={() => handleDelete(props._id)} />
        ]}
      >
        <Meta
          title={props.name}
          description={(props.price).toLocaleString('en-US', {
            style: "currency",
            currency: "IND"
          })}
        />
      </Card>
    </>
  );
}

export default Ant;
