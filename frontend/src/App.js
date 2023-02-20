import './App.css'

import Header from './components/layout/Header/Header.js'
import Footer from './components/layout/Footer/Footer.jsx'
import Home from './components/Home/Home.jsx'
import UserOptions from './components/layout/Header/UserOptions.js'
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.jsx'
import Profile from './components/User/Profile.jsx'
import UpdateProfile from './components/User/UpdateProfile.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import webfont from 'webfontloader'
import { useEffect } from 'react'
import LoginSignUp from './components/User/LoginSignUp'
import store from './store'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import Test from './Test'
import ProtectedRoutes from './components/Routes/ProtectedRoute'

function App () {
  const {user, isAuthenticated} = useSelector(state => state.authData)
  const {token} = useSelector(state => state.authToken)

  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
    store.dispatch(loadUser(token))
  }, [])
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/product/:id' element={<ProductDetails/>} />
        <Route exact path='/products' element={<Products/>} />
        <Route exact path='/search' element={<Search/>} />
        <Route exact path='/login' element={<LoginSignUp/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route exact path='/account' element={<Profile/>} />
          <Route exact path='/me/update' element={<UpdateProfile/>} />
        </Route>
        <Route path='/products/:keyword' element={<Products/>} />
        <Route path='/test' element={<Test/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
