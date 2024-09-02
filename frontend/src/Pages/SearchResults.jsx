import React from 'react';
import { useSearch } from '../context/Search';
import Product from '../Components/Product';
import NavBar from '../Components/NavBar';

const SearchResults = () => {
    const [values, setValues] = useSearch();

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="text-center">
                    <h1>Search Results:</h1>
                    <h6>
                        {values && values.results 
                            ? values.results.length < 1 
                                ? "No Products Found" 
                                : `Found ${values.results.length}`
                            : ""}
                    </h6>
                    <div className="fluid d-flex flex-wrap m-2 p-2 justify-content-center">
                        {values?.results.map(product => (
                            <Product key={product._id} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
