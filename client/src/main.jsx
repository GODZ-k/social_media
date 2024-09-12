import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider } from "@mui/joy/styles";
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import store from './redux/store/store.js'
import { Provider } from 'react-redux'
import { Toaster as Toast} from "@/components/ui/sonner"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
        <CssVarsProvider>
          <App />
        </CssVarsProvider>
          <Toaster/>
          <Toast/>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
 