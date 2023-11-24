import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { router } from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
