import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ProductInformationContract from './contracts/ProductInformationContract.json';
import AddProductForm from './components/AddProductForm.js';
import PlaceOrderForm from './components/PlaceOrderForm';
import ProductInformation from './components/ProductInformation';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [dummyProducts, setDummyProducts] = useState([]);
  const [dummyOrders, setDummyOrders] = useState([]);

  // handle AddProduct functionality if web3 smart contract does not work
  const handleAddProduct = (newProduct) => {
    setDummyProducts([...dummyProducts, newProduct]);
  }

  // handle AddProduct functionality if web3 smart contract does not work
  const handlePlaceOrder = (newProduct) => {
    setDummyOrders([...dummyOrders, newProduct]);
  }

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = ProductInformationContract.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            ProductInformationContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContractInstance(contract);
        } catch (error) {
          // Handle error during web3 initialization
        }
      }
    };

    initializeWeb3();
  }, []);

  // This is where I was unable to implement the Web3.js functionality.
  // When trying to connect to the app through a web browser, Web3 was never able to make a connection to a wallet local to the browser,
  // which is a supported functionality of Web3.
  // if (!web3) {
  //   return <div>Loading Web3...</div>;
  // }

  // if (!contractInstance) {
  //   return <div>Loading Contract...</div>;
  // }

  return (
    <div>
      <h1>Decentralized Product Information and Supply Chain Management System</h1>
      <AddProductForm contractInstance={contractInstance} onAddProduct={handleAddProduct}/>
      <PlaceOrderForm contractInstance={contractInstance} onPlaceOrder={handlePlaceOrder}/>
      <ProductInformation contractInstance={contractInstance} dummyProducts={dummyProducts} dummyOrders={dummyOrders}/>
    </div>
  );
};

export default App;