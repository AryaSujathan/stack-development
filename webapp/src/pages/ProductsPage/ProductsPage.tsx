import React, {useEffect, useState} from 'react';
import {Product} from '../../components/interfaces';
import {fetchProducts} from '../ApiHelper';
import PageWrapper from '../PageWrapper';
import Spinner from "../../components/Spinner/Spinner";


const DATA_STATES = {
    waiting: 'WAITING',
    loaded: 'LOADED',
    error: 'ERROR'
};

const ProductsPage: React.FC = () => {
    const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = async () => {
        setLoadingState(DATA_STATES.waiting);
        const {products, errorOccured} = await fetchProducts();
        setProducts(products);
        setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
    };

    useEffect(() => {
        getProducts();
    }, []);

    let content;
    if (loadingState === DATA_STATES.waiting)
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4"
                data-testid="loading-spinner-container"
            >
                <Spinner/>
            </div>
        );
    else if (loadingState === DATA_STATES.loaded)
        content = (
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8"
                data-testid="products-container"
            >
                {products.map((product) => (
                    <div key={product.ProductID}
                         className="max-w-xs w-full h-80 rounded overflow-hidden shadow-lg bg-white flex flex-col items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <img className="w-160 h-48 py-5 object-cover" src={product.ProductPhotoURL}
                             alt={product.ProductName}/>
                        <div className="w-full py-8 text-center bg-gray-200">
                            <div className="font-bold text-xl mb-2">{product.ProductName}</div>
                            <p className="text-gray-700 text-base">ProductID: {product.ProductID}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    else
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
                data-testid="error-container"
            >
                An error occured fetching the data!
            </div>
        );
    return (
        <PageWrapper>
            {content}
        </PageWrapper>
    );
};

export default ProductsPage;