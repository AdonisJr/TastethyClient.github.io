import React, {useState} from 'react';
import '../../css/form.css';
import * as userApi from '../../../api/admin';
import AdminLogic from '../../pages/AdminLogic';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddUserForm(props) {

  const {getAllUsers} = AdminLogic();
  const {action} = props;
  const initialState = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    age: '',
    role: 'Admin',
    password: '',
}
  const accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  const [userInput, setUserInput]= useState(action === 'Add' ? initialState : props.data)

  const handleUserInput = (e) =>{
    setUserInput({...userInput, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(action === 'Add'){
        await userApi.register(accessToken, userInput)
        .then(response =>{
            getAllUsers()
            setUserInput(initialState)
            const Alert = () => toast.success('Successfully saved')
                Alert();
        }).catch(error =>{
          const Alert = () => toast.error(error.response.data.message)
            Alert();
        })
    }else{
      await userApi.update(accessToken, userInput)
      .then(response =>{
        getAllUsers()
        const Alert = () => toast.success('Successfully updated')
                Alert();
      }).catch(error =>{
        const Alert = () => toast.error(error.response.data.message)
          Alert();
      })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
          <ToastContainer
                  position="top-right"
                  autoClose={1500}
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
          <div className="updateTitle" style={{display: action === 'Add' ? 'none': 'flex'}}>
              Update User
              <div className="closeButton" onClick={props.handleToggleModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
              </div>
          </div>
        <div className="formControl">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" placeholder='First Name' onChange={handleUserInput} value={userInput.first_name} required/>
        </div>
        <div className="formControl">
            <label htmlFor="middle_name">Middle Name</label>
            <input type="text" name="middle_name" placeholder='Middle Name' onChange={handleUserInput} value={userInput.middle_name}  />
        </div>
        <div className="formControl">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" placeholder='Last Name' onChange={handleUserInput} value={userInput.last_name} required />
        </div>
        <div className="formControl">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder='Email Address' onChange={handleUserInput} value={userInput.email} required />
        </div>
        <div className="formControl">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" placeholder='Age' onChange={handleUserInput} value={userInput.age} required />
        </div>
        <div className="formControl">
          <label htmlFor="role">Role</label>
          <select name="role" onChange={handleUserInput} value={userInput.role} >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
          </select>
        </div>
        <div className="formControl" style={{display: action === 'Add' ? 'flex' : 'none'}}>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='Password' onChange={handleUserInput} value={userInput.password} required={action === 'Add' ? true : false} />
        </div>
        <div className="formControl">
          <button>{action === 'Add' ? 'SAVE' : 'UPDATE'}</button>
        </div>
    </form>
  )
}
