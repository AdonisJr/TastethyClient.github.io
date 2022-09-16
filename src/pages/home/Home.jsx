import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './home.css'
import Main from '../../components/main/Main';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();    
  navigate('/redirect')
  return (
    <div className='homeContainer'>
        <header>
            <Navbar />
        </header>
            <Main />
      </div>
  )
}
