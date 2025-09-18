import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './app/App.tsx'
import { ReduxProvider } from './infraestructure/store/reduxProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </StrictMode>,
)
