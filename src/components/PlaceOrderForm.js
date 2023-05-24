import React, { useState } from 'react';

const PlaceOrderForm = ({ contractInstance, onPlaceOrder }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [senderAddress, setSenderAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contractInstance.methods
        .placeOrder(productId, quantity)
        .send({ from: senderAddress, value: 100 });
    } catch (error) {
      // Handle display functionality if web3 cannot connect
      const newOrder = {
        orderId: Math.floor(Math.random() * 100000),
        productId: productId,
        quantity: quantity
      };

      onPlaceOrder(newOrder);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sender's Ethereum Address"
        value={senderAddress}
        onChange={(e) => setSenderAddress(e.target.value)}
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlaceOrderForm;
