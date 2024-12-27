import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products') // Fetch from backend endpoint
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Product Listings</h2>
      {products.map(product => (
        <div key={product.id}>
           <Link to={`/products/${product.id}`}>
           <h3>{product.name}</h3></Link>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {product.image_url && (
              <img src={`/${product.image_url}`} alt={product.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
