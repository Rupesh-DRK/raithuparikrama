import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Checkbox } from 'antd';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaFilter } from 'react-icons/fa';
import { useCategory} from '../middleware/Hooks';
import { Collapse} from "antd";
import Product from './Product';
import {  Drawer, Spin} from 'antd';
import { } from 'antd';

import InfiniteScroll from 'react-infinite-scroll-component';


export default function Bar() {
  const { Panel } = Collapse;
  const [cate, setCate] = useCategory();
  const [range, setRange] = useState([10, 5000]);
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/backend/product?page=${page}&limit=5`);
      const newProducts = response.data.products;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length > 0);
     
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  
  const handleFilter = (value, id) => {
    setChecked(value ? [...checked, id] : checked.filter(c => c !== id));
  }

  const filterProducts = async () => {
    try {
      const respdata = await axios.post("/backend/product/cats?page=${page}&limit=5", { checked, range });
      setProducts(respdata.data);
    } catch (err) {
      console.log(err);
    }
  }

 

  useEffect(() => {
    if (checked.length || range.length) filterProducts();
  }, [checked, range]);

  const handleChange = (newRange) => {
    setRange(newRange);
  };

  
  
  return (
    <div>
      
      <Drawer title="Categories" onClose={onClose} open={open}
      placement='left' >
      <div className="category card ">
        <h3 style={{ color: "green" }}><FaFilter />Filters </h3>

        <Collapse >
          <Panel header="Price Range" key="1">
          <label htmlFor="customRange3 "  className="form-label">Selected range: {range[0]+"__to__"+range[1]}</label>
            <Slider
              min={0}
              max={100000}
              range
              step={1000}
              defaultValue={range}
              onChange={handleChange}
              trackStyle={[{ backgroundColor: 'green' }]}
              handleStyle={[{ borderColor: 'green' }, { borderColor: 'green' }]}
            />
          </Panel>
          <Panel header="Categories" key="2">
           <p className='d-flex flex-column' >  {cate?.map(cat => (
              <Checkbox key={cat._id} value={cat._id} onChange={(e) => handleFilter(e.target.checked, cat._id)}>{cat.name}</Checkbox>
            ))}</p>
          </Panel>
          
        </Collapse>
        <button className="btn btn-danger" onClick={()=>window.location.reload(false)}> reset all filters</button>
      </div>

      </Drawer>
     
      <div className='m-2 bg-body-tertiary p-2 text-right'>
      <FaFilter size={30}  onClick={showDrawer} /> Filters
      </div>
      <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={ <h4 className='d-flex justify-content-center'><div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div></h4> }
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b style={{color:'grey'}}>-------No More Products to Load----------</b>
        </p>
      }
    >
     <div className=" d-flex justify-content-center flex-wrap  m-3">
        {products.map((product,index) => (
          <Product key={index} {...product}></Product>
        ))}
      </div>
    </InfiniteScroll>
        
      </div>
  );
}
