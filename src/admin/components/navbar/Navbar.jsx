import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setActivePage } from '../../../redux/features/ActivePage.features';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { logout } from '../../../redux/features/User.features';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activePage = useSelector((state)=>state.activePage.value);
    const userDetails = useSelector((state)=>state.user.value);

    const handleLogout = (e) =>{
        if(e.target.name === 'login'){
            navigate('/login')

        }else{
          
        swal({
          title: "Are you sure you wan't to log out?",
          icon: "info",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            localStorage.removeItem('token');
            dispatch(logout())
    
            swal("Successfully logout", {
              icon: "success",
            });
            setTimeout(()=>{
              navigate('/');
            },1500)
          } 
        });   
    }
      }

  return (
    <div className='navbar'>
       
        <div className="logo" onClick={()=>dispatch(setActivePage(0))}>
            <p className="title">
            Taste<span>tify</span>
            </p>
        </div>
        <div className="buttons">
            <ul>
                <li className={activePage === 1 ? 'active':''} onClick={()=>dispatch(setActivePage(1))}>Add account</li>
                <li className={activePage === 2 ? 'active':''} onClick={()=>dispatch(setActivePage(2))}>View all users</li>
                <li className={activePage === 3 ? 'active':''} onClick={()=>dispatch(setActivePage(3))}>Messages</li>
            </ul>
        </div>
        <div className="account">
            <label htmlFor="User Details">{userDetails === 'none' || userDetails === null ?  'Please Login' : `${userDetails.last_name}, ${userDetails.first_name}` }</label>
            <button name={userDetails === 'none' || userDetails === null ? 'login' : 'logout'} onClick={handleLogout}>{userDetails === 'none' ? 'Login' : 'Logout'}</button>
            <h1>Admin Dashboard</h1>
        </div>
    </div>
  )
}
