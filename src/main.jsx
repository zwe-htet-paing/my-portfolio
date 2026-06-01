import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnimatedBackground />
    <App />
  </StrictMode>,
)
