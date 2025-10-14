import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CardTest from './components/CardDemo'
import CardStack from './components/Cards'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardStack />
  </StrictMode>,
)
