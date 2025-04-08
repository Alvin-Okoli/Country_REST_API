import React from 'react'
import './App.css'
import Nav from './Components/Nav.jsx'
import Country  from './Components/Country.jsx';
import Countryinfo from './Components/Countryinfo.jsx';
import {loader} from './Components/loader/loader.jsx';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route element={<Nav/>}>
        <Route index element={<Country/>}/>
        <Route path='country/:country' element={<Countryinfo/>} loader={loader}/>
      </Route>
    </>
    )
  )

  return (
      <RouterProvider router={router}/>
  )
}

export default App
