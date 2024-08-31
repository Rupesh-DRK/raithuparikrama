import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Checkbox } from 'antd';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaFilter } from 'react-icons/fa';
import { useCategory, useProducts } from '../middleware/Hooks';
import { Collapse, Drawer } from 'antd';
import Product from './Product';
import ProductSkeleton from '../Skeletons/ProductSkeleton'; // Assume this skeleton exists

export default function Bar() {
  const { Panel } = Collapse;
  const [cate, setCate] = useCategory(); // Ensure useCategory returns initial data
  const [range, setRange] = useState([10, 5000]);
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
    setIsLoading(true);

      const response = await axios.get(`/backend/product/getProducts`);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
  }, [products]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleFilter = (value, id) => {
    setChecked(value ? [...checked, id] : checked.filter(c => c !== id));
  };

  const filterProducts = async () => {
    setIsLoading(true);
    try {
      const respdata = await axios.post("/backend/product/cats?page=1&limit=5", { checked, range });
      setProducts(respdata.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (checked.length || range.length) filterProducts();
  }, [checked, range]);

  const handleChange = (newRange) => {
    setRange(newRange);
  };

  return (
    <div>
      <Drawer title="Categories" onClose={onClose} open={open} placement='left'>
        <div className="category card">
          <h3 style={{ color: "green" }}><FaFilter /> Filters </h3>
          <Collapse>
            <Panel header="Price Range" key="1">
              <label htmlFor="customRange3" className="form-label">Selected range: {range[0] + "__to__" + range[1]}</label>
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
              <p className='d-flex flex-column'>
                {cate && Array.isArray(cate) && cate.length > 0 ? (
                  cate.map(cat => (
                    <Checkbox key={cat._id} value={cat._id} onChange={(e) => handleFilter(e.target.checked, cat._id)}>{cat.name}</Checkbox>
                  ))
                ) : (
                  <div>No categories available</div>
                )}
              </p>
            </Panel>
          </Collapse>
          <button className="btn btn-danger" onClick={() => window.location.reload(false)}>Reset all filters</button>
        </div>
      </Drawer>

      <div className='m-2 bg-body-tertiary p-2 text-right'>
        <FaFilter size={30} onClick={showDrawer} /> Filters
      </div>

      <div className="d-flex justify-content-center flex-wrap m-3">
        {isLoading ? (
          [...Array(4)]?.map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          products?.map((product, index) => (
            <Product key={index} {...product} />
          ))
        )}
      </div>
    </div>
  );
}
