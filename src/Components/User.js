import React, { useState,useEffect } from 'react'
import '../App.css';

function User({user,deleteUser,checkedUser,checkedAll}) {

    const handleDelete = (id)=>{
        deleteUser(users => {
            let _new = users.filter(user => user.id!==id);
            return _new;
        })
    }
    const [edit,setEdit] = useState(false);
    const [checked,setChecked] = useState(false);
    const [editedUser,setEditedUser] = useState(user);

    useEffect(()=>{
        if (checkedAll){
            checkedUser(prev=> [...prev,user.id])
        }else{
            checkedUser(prev => {
                return prev.filter(id => id!==user.id);
            })
        }
    },[checkedAll])

    useEffect(()=>{
        if (checked){
            checkedUser(prev=> [...prev,user.id])
        }else{
            checkedUser(prev => {
                return prev.filter(id => id!==user.id);
            })
        }
    },[checked])

    const handleChecked = (e)=>{
        setChecked(e.target.checked);
    }

    const handleEdit = (state,value)=>{
        setEditedUser((user)=>{
            let _new = {...user,[`${String(state)}`]:value}
            return _new;
        })
    }

    const handleSave = (id)=>{
        const UpdateUser = deleteUser;
        UpdateUser(users => {
            let _new_users = [...users];
            for(let i=0;i<_new_users.length;i++){
                if (_new_users[i].id===id){
                    _new_users[i]=editedUser;
                }
            }
            return _new_users;
        })
        setEdit(false);
    }

    const handleCancel = ()=>{
        setEditedUser(user);
        setEdit(false);
    }

    return (
        <>
            {edit?
                <tr className="user-row">
                    <td className="checkbox">
                        <input type="checkbox" name="dummy" id="dummy" checked={checkedAll} onClick={handleChecked}/>
                    </td>
                    <td>
                        <input type="text" value={editedUser.name} onChange={(e)=>{handleEdit('name',e.target.value)}}/>
                    </td>
                    <td>
                        <input type="text" value={editedUser.email} onChange={(e)=>{handleEdit('email',e.target.value)}}/>
                    </td>
                    <td>
                        <input type="text" value={editedUser.role} onChange={(e)=>{handleEdit('role',e.target.value)}}/>
                    </td>
                    <td>
                        <div className="icon-group">
                            <img className="edit-icon" onClick={(e)=>{handleSave(user.id)}} src="https://img.icons8.com/dotty/80/000000/save.png" alt=""/>
                            <img className="delete-icon" onClick={(e)=>{handleCancel()}} src="https://img.icons8.com/color/48/000000/cancel--v1.png" alt=""/>
                        </div>
                    </td>
                </tr>
             :
            <tr className="user-row">
              <td className="checkbox">
                  <input type="checkbox" name="dummy" id="dummy" checked={checkedAll} onClick={handleChecked}/>
              </td>
              <td>{editedUser.name}</td>
              <td>{editedUser.email}</td>
              <td>{editedUser.role}</td>
              <td>
                  <div className="icon-group">
                    <img className="edit-icon" onClick={(e)=>{setEdit(true)}} src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-edit-interface-kiranshastry-solid-kiranshastry.png" alt=""/>
                    <img className="delete-icon" onClick={(e)=>{handleDelete(user.id)}} src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-solid-kiranshastry.png" alt=""/>
                  </div>
              </td>
            </tr>}
        </>
    )
}

export default User
