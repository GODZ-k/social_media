import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider } from "@mui/joy/styles";
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import store from './redux/store/store.js'
import { Analytics } from "@vercel/analytics/react"
import { Provider } from 'react-redux'
import { Toaster as Toast} from "@/components/ui/sonner.jsx"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <ChakraProvider>
        <CssVarsProvider>
          <App />
        </CssVarsProvider>
          <Toaster />
          <Analytics/>
          <Toast position="top-right"   closeButton/>
        </ChakraProvider>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
 