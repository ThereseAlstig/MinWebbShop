import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import '../src/styles/main.scss'
import { RouterProvider } from 'react-router-dom'
import Router from './router/router.tsx'





ReactDOM.createRoot(document.getElementById('root')!).render(
 
    
      <RouterProvider router={Router}>
      </RouterProvider>
    
  
)

