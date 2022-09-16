import React from 'react';
import '../../css/addUser.css';
import AddUserForm from '../form/AddUserForm';

export default function AddUser() {
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
