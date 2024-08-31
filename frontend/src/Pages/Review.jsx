import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/Auth';
import Star from '../Components/Star';
import { Avatar, Divider } from 'antd';
import StarShow from '../Components/StarShow';

const Reviews = ({ productId, sellerId }) => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [auth] = useAuth();
  const pf = "/backend/images/";
  const [updateData, setUpdateData] = useState({
    rating: 0,
    review: ''
  });

  useEffect(() => {
    axios.get(`/backend/review/product/${productId}`)
      .then(response => {
        setReviews(response.data);
        const userIds = response.data.map(review => review.userId);
        fetchUsers(userIds);
        
      })
      .catch(error => console.error(error));
  }, [productId]);

  const fetchUsers = (userIds) => {
    axios.post(`/backend/user/users/`, { userIds })
      .then(response => {
        const usersMap = response.data.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(usersMap);
   
      })
      .catch(error => console.error(error));
  };

  const submitReview = (e) => {
    e.preventDefault();
    axios.post('/backend/review/', { productId, sellerId, userId: auth.user._id, rating, comment })
      .then(response => {
        setReviews([...reviews, response.data]);
        Swal.fire('Success', 'Review submitted successfully', 'success');
        setRating(0);
        setComment('');
      })
      .catch(error => {
        console.error(error);
        Swal.fire('Error', 'Failed to submit review', 'error');
      });
  };

  const handleEditClick = (review) => {
    if (editReviewId === review._id) {
      setEditReviewId(null);
    } else {
      setEditReviewId(review._id);
      setUpdateData({
        rating: review.rating,
        review: review.comment
      });
    }
  };

  const handleUpdateSubmit = (e, reviewId) => {
    e.preventDefault();
    axios.put(`/backend/review/${reviewId}`, { rating: updateData.rating, comment: updateData.review })
      .then(response => {
        const updatedReviews = reviews.map(review => 
          review._id === reviewId ? { ...review, rating: updateData.rating, comment: updateData.review } : review
        );
        setReviews(updatedReviews);
        setEditReviewId(null);
        Swal.fire('Success', 'Review updated successfully', 'success');
      })
      .catch(error => {
        console.error(error);
        Swal.fire('Error', 'Failed to update review', 'error');
      });
  };

  const handleDeleteClick = (reviewId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/backend/review/${reviewId}`)
          .then(response => {
            setReviews(reviews.filter(review => review._id !== reviewId));
            Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
          })
          .catch(error => {
            console.error(error);
            Swal.fire('Error', 'Failed to delete review', 'error');
          });
      }
    });
  };

  return (
    <div>
      
      <div>
      <Divider plain><h6>Reviews</h6></Divider>

        {reviews.map(review => (
          <div className='d-flex p-0 m-0' key={review._id}>
            <p className='px-2 m-2'>
              <Avatar style={{border:"2px solid lightgrey"}} size={40} src={pf+users[review.userId]?.profile} icon={<i className='fa-solid fa-user'></i>} />
            </p>
            <div className='my-2 bg-body-tertiary ps-2 d-flex flex-column w-100'>
              <div className='p-0 m-0 d-flex align-items-center justify-content-between'>
                <h5 className='m-0 p-0'>{users[review.userId]?.username }</h5>
                {((review.userId === auth.user._id) && (auth.user.type === "consumer")) && (
                  <p>
                    <span style={{ width: "40px" }} className='btn btn-outline-warning p-0 m-1'>
                      <i
                        style={{ fontSize: "15px" }}
                        onClick={() => handleEditClick(review)}
                        className='fa-solid fa-edit'
                      ></i>
                    </span>
                    <span style={{ width: "40px" }} className='btn btn-outline-danger p-0 m-1'>
                      <i
                        style={{ fontSize: "15px" }}
                        onClick={() => handleDeleteClick(review._id)}
                        className='fa-solid fa-trash'
                      ></i>
                    </span>
                  </p>
                )}
              </div>
              {editReviewId === review._id ? (
                <form onSubmit={(e) => handleUpdateSubmit(e, review._id)}>
                  <span className='m-0 p-0'>
                    <Star rating={updateData.rating} onRatingChange={newRating => setUpdateData({ ...updateData, rating: newRating })} />
                  </span>
                  <p className='bg-body-secondary m-0 p-2'>
                    <input
                      type="text"
                      className='form-control'
                      value={updateData.review}
                      onChange={e => setUpdateData({ ...updateData, review: e.target.value })}
                    />
                    <button className='btn btn-primary' type='submit'>Update</button>
                  </p>
                </form>
              ) : (
                <>
                  <span className='m-0 p-0'><StarShow rating={review.rating} /></span>
                  <p className='bg-body-secondary m-0 p-2'>{review.comment}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <br />
      {auth?.user?.type === "consumer" ? (
        <div>
          <Divider plain><h6>Submit your own Review below</h6></Divider>

          <form onSubmit={submitReview}>
            <strong>Rate:</strong>
            <Star style={{ fontSize: 100 }} rating={rating} onRatingChange={setRating} />
            <strong>Review:</strong>
            <textarea
              required
              className='form-control mb-2'
              value={comment}
              onChange={e => setComment(e.target.value)}
            ></textarea>
            <button className="btn btn-primary" type='submit'>Submit</button>
          </form>
        </div>
      ): "" }
    </div>
  );
};

export default Reviews;
