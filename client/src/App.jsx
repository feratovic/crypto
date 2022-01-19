import { useState } from 'react';
 import './App.css';
import { Footer, Navbar, Services, Transactions, Welcome } from './components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
const  App = () => {
  return (
    <div className="min-h-screen">
       <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
           draggable
        />
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome />
      </div>
       <Services />
       <Transactions />
       <Footer />      
    </div>
  )
}

export default App
