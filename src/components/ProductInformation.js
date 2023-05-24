import React, { useEffect, useState } from 'react';

const ProductInformation = ({ contractInstance, dummyProducts, dummyOrders }) => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product information from the smart contract
        const productCount = await contractInstance.methods.productCount().call();
        const productPromises = [];
        for (let i = 0; i < productCount; i++) {
          productPromises.push(contractInstance.methods.products(i).call());
        }
        const productResults = await Promise.all(productPromises);
        setProducts(productResults);

        // Fetch inventory levels from the smart contract
        const inventoryPromises = [];
        for (let i = 0; i < productCount; i++) {
          inventoryPromises.push(contractInstance.methods.getInventory(i).call());
        }
        const inventoryResults = await Promise.all(inventoryPromises);
        setInventory(inventoryResults);

        // Fetch order status from the smart contract
        const orderCount = await contractInstance.methods.orderCount().call();
        const orderPromises = [];
        for (let i = 0; i < orderCount; i++) {
          orderPromises.push(contractInstance.methods.orders(i).call());
        }
        const orderResults = await Promise.all(orderPromises);
        setOrders(orderResults);
      } catch (error) {
        // Handle functionality if web3 cannot connect
        setProducts(dummyProducts);
        setOrders(dummyOrders)
      }
    };

    fetchData();
  },
  );

  return (
    <div>
      <h2>Product Information</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>{`Product ID: ${product.productId}`}</div>
            <div>{`Description: ${product.description}`}</div>
            <div>{`Image: ${product.image}`}</div>
            <div>{`Price: ${product.price}`}</div>
            <div>{`Inventory: ${inventory[index] || 0}`}</div>
          </li>
        ))}
      </ul>
      <h2>Order Status</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <div>{`Order ID: ${order.orderId}`}</div>
            <div>{`Product ID: ${order.productId}`}</div>
            <div>{`Quantity: ${order.quantity}`}</div>
            <div>{`Status: ${order.status}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInformation;
