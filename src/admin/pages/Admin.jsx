import React, {useState, useEffect} from 'react';
import '../css/admin.css';
import Navbar from '../components/navbar/Navbar';
import LandingPage from '../components/landingPage/LandingPage';
import Users from '../components/addUsers/AddUser';
import ViewUsers from '../components/viewUsers/ViewUsers';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogic from './AdminLogic';
import { useSelector } from 'react-redux';

export default function Admin() {

  const {getAllUsers} = AdminLogic();
  const activePage = useSelector((state)=>state.activePage.value);

  useEffect(()=>{
    getAllUsers()
  },[])
  

  return (
    <div className='admin'>
      <ToastContainer
                  position="top-right"
                  autoClose={1800}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnHover
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  theme='dark'
                  // pauseOnHover
          />
        <header>
            <Navbar />
        </header>
        <main>
            {
              activePage === 1 ? < Users /> :
              activePage === 2 ? < ViewUsers /> :
              <LandingPage />
            }
        </main>
    </div>
  )
}
