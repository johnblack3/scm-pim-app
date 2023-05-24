import React, { useState } from 'react';

const AddProductForm = ({ contractInstance, onAddProduct }) => {
  const [productId, setProductId] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [senderAddress, setSenderAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add product to blockchain
      await contractInstance.methods
        .addProduct(productId, description, image, price)
        .send({ from: senderAddress });
      console.log('ahh');
    } catch (error) {
      // Handle display functionality if web3 cannot connect
      const newProduct = {
        productId: productId,
        description: description,
        image: image,
        price: price,
      };

      onAddProduct(newProduct);
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
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sender's Ethereum Address"
        value={senderAddress}
        onChange={(e) => setSenderAddress(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
