import React, {useState} from 'react';
import './register.css';
import RegisterForm from './RegisterForm';
import * as authApi from '../../api/auth';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
 
    // code for handling focus in validation
    const [isFocused, setIsFocused] = useState({
      first_name: false,
      last_name: false,
      email: false,
      age: false,
      password: false,
      confirm_password: false
    });
  
  const handleFocused = (e) =>{
      setIsFocused({...isFocused, [e.target.name]: true})
  }
  // END code for handling focus in validation

  const initialState = {
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    email: "",
    role: "User",
    password: "",
    confirm_password: ""
}

  const [credentials, setCredentials] = useState(initialState)

  const handleInput = (e) =>{
    setCredentials({ ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    await authApi.register(credentials)
    .then(response=>{
      const Alert = () => toast.success(response.data.message)
      Alert();
      setCredentials(initialState)
      setIsFocused({
        first_name: false,
        last_name: false,
        email: false,
        age: false,
        password: false,
        confirm_password: false
      })
      
    }).catch(error =>{
      const Alert = () => toast.error(error.response.data.message)
      Alert();
      
    })
  }

  return (
    <div className='registerContainer'>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            // pauseOnHover
            />
      <div className="container">
        <div className="image">
          <div>
            <h1>Already have an account?</h1>
            <a href="/login">Sign in</a>
          </div>
          
          <img src="" alt="" />
          <h2>wewe</h2>
        </div>
        <RegisterForm handleFocused={handleFocused} isFocused={isFocused} credentials={credentials} handleInput={handleInput} handleSubmit={handleSubmit}/>
      </div>
        
    </div>
  )
}
