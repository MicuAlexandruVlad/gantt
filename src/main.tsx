import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'jotai'

createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
)
