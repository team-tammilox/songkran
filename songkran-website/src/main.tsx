import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SongkranLanding from './SongkranLanding'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SongkranLanding />
  </StrictMode>,
)