import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageAll from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageAll />
  </StrictMode>,
)
