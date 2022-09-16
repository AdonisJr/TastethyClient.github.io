import React from 'react';
import AddUserForm from '../form/AddUserForm';
import '../../css/modal.css'

export default function Modal(props) {

    const {toggleModal, handleToggleModal, data} = props;

    if(!toggleModal) return null
    
  return (
    <div className='modal'>
        <AddUserForm data={data} handleToggleModal={handleToggleModal} />
    </div>
  )
}
