import React from 'react';
import './redirect.css';
import { useNavigate } from 'react-router-dom';

export default function Redirect() {

  const navigate = useNavigate();

  setTimeout(()=>{
    navigate('/')
  },1500)
  
  return (
    <div className='redirectContainer'>
        <h1>Redirecting...</h1>
        <div className="spinner">

        </div>
    </div>
  )
}
