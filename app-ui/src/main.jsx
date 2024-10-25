import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MyProvider } from './context/Context';
import { ChakraProvider  } from '@chakra-ui/react';



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <MyProvider>
        <ChakraProvider >
          <App />
        </ChakraProvider>
      </MyProvider>
    </BrowserRouter>
);
