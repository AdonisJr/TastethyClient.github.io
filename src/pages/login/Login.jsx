import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import LoginForm from './LoginForm';
import './login.css';
import * as authApi from '../../api/auth';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/features/User.features';

export default function Login() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state)=>state.user.value)
  

    const initalState = {email: "", password: ""};
    const [credentials, setCredentials] = useState(initalState);

    const handleInput =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();

        await authApi.login(credentials)
        .then(response =>{

          localStorage.setItem('token', response.data.accessToken)
          setCredentials(initalState)
          dispatch(login(response.data.data))

          const Alert = () => toast.success('Successfully Login')
          Alert();
          navigate('/redirect')
         
        }).catch(error =>{
          const Alert = () => toast.error(error.response.data.message)
          Alert();
        })
    }

  if(userDetails !== 'none' && userDetails !== null) return navigate('/redirect');

  return (
    <div className='loginContainer'>
        <div className="container">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              />
            <LoginForm handleSubmit={handleSubmit} handleInput={handleInput} credentials={credentials} />
            <div className="image">
              <h1 className='newHere'>New here?</h1>
              <p>Sign up and discover lots of </p>
              <p>Tasty recipes</p>
              <a href="/register">Sign up</a>
            </div>
        </div>
    </div>
  )
}
