import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './home.css'
import Main from '../../components/main/Main';

export default function Home() {

  return (
    <div className='homeContainer'>
        <header>
            <Navbar />
        </header>
            <Main />
      </div>
  )
}
