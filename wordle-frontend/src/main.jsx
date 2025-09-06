import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/routes'


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
