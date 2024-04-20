// ProductPage.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal'; // Import your Modal component
import { Header } from './Header';
import { Footer } from './Footer';
import { GetProducts } from '../Service';
import MemberHeader from './MemberHeader';

const ProductPurchasePage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [prods, setProducts] = useState([]);

    const isAuthenticated = localStorage.getItem("token") ? true : false;

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data");
            const data = await GetProducts();
            console.log(data);
            setProducts(data);
        };
        fetchData();
    }, []);

    // Function to handle opening the modal and setting the selected product
    const openModal = (product) => {
        setSelectedProduct(product);
    };

    // Function to handle adding the selected product to the cart
    const addToCart = () => {
        // Implement functionality to add product to cart (e.g., send a request to backend)
        console.log(`Added ${quantity} of ${selectedProduct.name} to cart`);
        setSelectedProduct(null); // Close the modal
    };

    return (
        <div>
            <div style={{ paddingTop: '100px', textAlign: 'center' }}>
                {isAuthenticated ? <MemberHeader /> : <Header />}
                <h1>Product Page</h1>
                {prods.map(product => (
                    <div key={product.Product_ID}>
                        <ProductCard product={product} openModal={() => openModal(product)} />
                    </div>
                ))}
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        addToCart={addToCart}
                        closeModal={() => setSelectedProduct(null)}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductPurchasePage;
