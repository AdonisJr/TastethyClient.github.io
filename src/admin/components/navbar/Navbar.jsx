import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setActivePage } from '../../../redux/features/ActivePage.features';
import { useSelector, useDispatch } from 'react-redux';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activePage = useSelector((state)=>state.activePage.value);
  return (
    <div className='navbar'>
       
        <div className="logo" onClick={()=> navigate('/admin')}>
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
            <label htmlFor="User Details">Please Login</label>
            <button>Login</button>
            <h1>Admin Dashboard</h1>
        </div>
    </div>
  )
}
