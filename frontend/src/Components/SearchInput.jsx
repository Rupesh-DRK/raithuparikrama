import React from 'react';
import { useSearch } from '../context/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.get(`http://localhost:5002/backend/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (err) {
            console.log(err);
        }
    };

    return (
            <form className="d-flex align-items-baseline mx-2" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control col-lg-12"
                    type="search"
                    placeholder="...Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit"><i className='fa-solid fa-magnifying-glass'></i></button>
            </form>
    
    );
};

export default SearchInput;
