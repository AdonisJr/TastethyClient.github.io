import {useEffect} from 'react';
import * as authApi from '../../api/auth';
import * as userApi from '../../api/admin';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../redux/features/Users.feature';
import { login } from '../../redux/features/User.features';

export default function AdminLogic() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''; 
    const getAllUsers = async () =>{
      userApi.getAll(accessToken)
      .then(response=>{
         dispatch(setUsers(response.data.data))
      })
    }

    // SET USER DETAILS
    
    useEffect(()=>{
      const getUser = async ()=>{
        
        await authApi.getUserDetails(accessToken)
        .then(response=>{
          dispatch(login(response.data.data))
          
        }).catch(error=>{
          dispatch(login('none'))
        })
      }
      getUser();
    },[])

  return { getAllUsers }
  
}
