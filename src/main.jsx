import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ReservaProvider } from './context/ReservaContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReservaProvider>
          <App />
        </ReservaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
