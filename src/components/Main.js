import React, { useEffect } from 'react'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Header from './Header/Header'
import { Route, Routes } from 'react-router-dom'
import Orders from './orders/Orders'
import Checkout from './orders/Checkout/Checkout'
import Auth from './Authentication/Auth'
import LogOut from './Authentication/LogOut'
import { connect } from 'react-redux';
import { authCheck } from '../redux/AuthActioncreaters'
import PrivateRoutes from '../utils/PrivateRoutes'



const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}




const Main = (props) => {


  useEffect(()=>{
    props.authCheck()
  },[])
  return (
    <div>
        <Header/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<BurgerBuilder/>}/>

            <Route element={<PrivateRoutes />}>
            <Route path='/orders' element={<Orders/>}/>
</Route>
            
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/login' element={<Auth/>}/>
            <Route path='/logout' element={<LogOut/>}/>
          </Routes>
        </div>
        
    </div>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)



