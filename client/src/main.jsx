import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import store from './redux/store/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
          <Toaster/>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
 