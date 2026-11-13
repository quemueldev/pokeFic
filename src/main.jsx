// Arquivo principal da aplicação: inicializa o React, carrega o CSS global e renderiza o componente principal App dentro do elemento 'root' da página.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './game/main/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
