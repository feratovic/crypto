import React, {createContext, useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constans';

import { toast } from 'react-toastify';

export const TransactionContext = createContext();

const {ethereum} = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;

};

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
  const [isLoading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'));
  const [ transactions, setTransactions ] = useState([]);

  const handleChange  = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value}) )
  }


  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        toast.warn('Please install metamask!');
        return;
      }  
      const transactionsContract = getEthereumContract();

      const availableTransactions = await  transactionsContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender, 
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))
      
      setTransactions(structuredTransactions);

    }catch (error) {
      console.log(error);
      toast.error("No ethereum object.");
      throw new Error("No ethereum object.")
    }
  }

  const checkIfWalletIsConnected = async () => {
    try{
    if (!ethereum){
      toast.warn('Please install metamask!');
      return;
    }  

    const accounts = await ethereum.request({method: 'eth_accounts'});
    
    if(accounts.length){
      setCurrentAccount(accounts[0]);
      getAllTransactions();
    }else{
      console.log('No accounts found');
      //toast.error("No ethereum object.");
    }
  }catch (error){
    console.log(error);
    toast.error("No ethereum object.");
    throw new Error("No ethereum object.")
  }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionsContract = getEthereumContract();
      const transactionsCount = await transactionsContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionsCount);

    }catch (error) {
      console.log(error);
      //toast.error("No ethereum object.");
      throw new Error("No ethereum object.")
    }
  }


  const  connectWallet  = async () => {
    try {
      if(!ethereum){
        toast.warn('Please install metamask!');
        return;
      }  

      const accounts = await ethereum.request({method: 'eth_requestAccounts'});

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      toast.error("No ethereum object.");
      throw new Error("No ethereum object.")
    }
  }

  const sendTransaction = async () => {
   // try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        if(addressTo === currentAccount) {
          toast.warn('Change value from addressTo field!');
          return;
        }

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());

        setFormData(prevState => ({ ...prevState,  addressTo: '', amount: '', keyword: '', message: ''}))
        getAllTransactions();
        
      } else {
        console.log("No ethereum object");
        toast.error("No ethereum object.");
      }
  /*  } catch (error) {
      console.log(error);
      toast.error("No ethereum object.");
      throw new Error("No ethereum object");
    }*/
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider 
    value={{ 
      connectWallet, 
      currentAccount,
      handleChange, 
      sendTransaction, 
      formData, 
      transactions, 
      isLoading, 
      }}
      >
      {children}
    </TransactionContext.Provider>
  );
};
