import { Children } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './src/components/App'
import Home from './src/components/Home'
import Browse from './src/components/Browse'
import Addbooks from './src/components/Addbooks'
import Wishlist from './src/components/Wishlist'
import Genre from './src/components/Genre'
import Bdetails from './src/components/Bdetails.jsx'
import ErrorPage from './src/components/ErrorPage.jsx'

import { store } from './src/utils/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>, 
    children: [
      {
        path: '/',
        element: <Home/>
      }, {
        path: '/book/:book',
        element: <Bdetails/>
      }, {
        path: '/genre/:genre',
        element: <Genre/>
      }, {
        path: '/browse',
        element: <Browse/>
      }, {
        path: '/addbooks',
        element: <Addbooks/>
      }, {
        path: '/wishlist',
        element: <Wishlist/>
      }
    ]}
])

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)