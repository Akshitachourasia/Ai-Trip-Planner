import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CreateTrip from './create-trip/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
   path: '/view-trip/:tripId',
   element: <ViewTrip/>
  },
{
 path :'/my-trips',
 element: <MyTrips/>
}
])
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <GoogleOAuthProvider clientId="295995789889-2oie3ss8um8mj76smhhmt8bq5aoa8jdi.apps.googleusercontent.com">
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>
)
