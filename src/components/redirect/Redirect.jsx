import React from 'react';
import './redirect.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Redirect() {

  const userDetails = useSelector((state)=> state.user.value)
  const navigate = useNavigate();
// console.log(userDetails)
  !userDetails ? navigate('/') : 

  setTimeout(()=>{
    if(userDetails.role === 'Admin'){
      navigate('/admin')
    }else{
      navigate('/')
    }
  },1500)
  
  return (
    <div className='redirectContainer'>
        <h1>Redirecting...</h1>
        <div className="spinner">

        </div>
    </div>
  )
}
