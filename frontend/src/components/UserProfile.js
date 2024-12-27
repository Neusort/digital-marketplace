import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [orders, setOrders] = useState([]);
    useEffect(() => {
       const fetchOrders = async () => {
          const token = localStorage.getItem('token');
          if(!token) {
            return;
          }
          try{
           const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.id;
             const response = await fetch(`/api/orders/user/${userId}`);
             const data = await response.json();
             if(response.ok) {
                setOrders(data)
             }

          } catch (error) {
            console.error('Error fetching orders', error);
          }
       }
       fetchOrders();
    }, []);
  // Implement user profile logic here
  return (
    <div>
      <h2>User Profile</h2>
       <h3>Order History</h3>
      {orders.map(order => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
             <p>Total Price: {order.total_price}</p>
             <p>Shipping Address: {order.shipping_address}</p>
          </div>
      ))}
    </div>
  );
}

export default UserProfile;
