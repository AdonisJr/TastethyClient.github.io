import React, {useState} from 'react';
import '../../css/viewUsers.css';
import * as usersApi from '../../../api/admin';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../../redux/features/Users.feature';
import swal from 'sweetalert';
import Modal from '../modal/Modal';

export default function ViewUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state)=> state.users.value)
  const accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  
  const handleDelete = async(data)=>{
      const credentials = {
        accessToken,
        user_id: data.user_id
      }
      swal({
        title: "Are you sure you wan't to delete this user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          usersApi.remove(credentials)
          .then(response =>{
            dispatch(removeUser(data.index))
          })
          swal("Successfully deleted", {
            icon: "success",
          });
        } 
      });

  }

  // OPEN OR CLOSE MODAL
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleToggleModal = (user) =>{
    setToggleModal(!toggleModal);
    setSelectedUser(user);
}

const userDetails = useSelector((state)=>state.user.value)

  if(userDetails === 'none' || userDetails === null) return <h1>Please Login</h1>


if(!users) return null

  const userList = users.map((user, index)=>{
    let credentials = {
      user_id: user.user_id, 
      index
    }
    return <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.middle_name}</td>
              <td>{user.last_name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td  className='action'>
                  <span className='update' onClick={() =>handleToggleModal(user)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </span>
                  <Modal data={selectedUser} handleToggleModal={handleToggleModal} toggleModal={toggleModal} />
                  <span className='delete' onClick={()=>handleDelete(credentials)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                  </span>
              </td>
          </tr>
  })

  return (
    <div className='viewUsers'>
        
        <table>
            <thead>
                <tr>
                    <th>User I.D</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                  userList
                }
            </tbody>
        </table>
    </div>
  )
}
