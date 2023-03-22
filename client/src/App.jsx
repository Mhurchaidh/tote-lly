import { useContext, useEffect, useState } from 'react'
import './App.css'
import { UserContext } from './context/user'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import HomePage from './components/HomePage'
import SoldItems from './components/SoldItemsPage'
import Listings from './components/Listings'

function App() {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if(!user) {
      fetch('/api/me').then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => setUser(user));
        } else console.log("Problem!")
      });
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={!user ? <Login/> : <HomePage/>}>
        <Route path='listings' element={<Listings/>}/>
        <Route path='sold-items' element={<SoldItems/>}/>
      </Route>
    </Routes>
  )
}

export default App
