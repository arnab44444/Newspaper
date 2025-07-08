import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'

// ✅ TanStack Query Setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)







// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import AuthProvider from './provider/AuthProvider.jsx'
// import { ToastContainer } from 'react-toastify'
// import { RouterProvider } from 'react-router'
// import router from './routes/router.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//       <ToastContainer></ToastContainer>
//           <RouterProvider router={router}></RouterProvider>
//     </AuthProvider>
//   </StrictMode>,
// )
