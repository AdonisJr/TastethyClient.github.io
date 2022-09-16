import React from 'react';
import '../../css/addUser.css';
import AddUserForm from '../form/AddUserForm';
import { useSelector } from 'react-redux';

export default function AddUser() {
  const userDetails = useSelector((state)=>state.user.value)

  if(userDetails === 'none' || userDetails === null) return <h1>Please Login</h1>

  return (
    <div className='addUser'>
      <div className="content">
        <div className="title">
            Add new user
        </div>
        <AddUserForm action={'Add'} />
      </div>
        
    </div>  
  )
}
