import * as userApi from '../../api/admin';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../redux/features/Users.feature';

export default function AdminLogic() {
    const dispatch = useDispatch();
  
    const getAllUsers = async () =>{
      userApi.getAll()
      .then(response=>{
         dispatch(setUsers(response.data.data))
      })
    }
  return { getAllUsers }
  
}
