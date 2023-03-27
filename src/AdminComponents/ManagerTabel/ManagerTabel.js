import './ManagerTabel.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getManagers, deleteUser, selectValues } from '../../app/usersSlice';
import { useState } from 'react';

const ManagerTabel = () => {
    
    const users = useSelector(selectValues);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getManagers());
    }, [])

    const delUser= async(e, id) => {
        e.preventDefault();
        e.target.hidden = true;
        let res = await dispatch(deleteUser({userId: id}))
        if(res.payload.status == '200'){
            alert("Deleted!");
            window.location.reload(false);
        }else{
            alert('Try later!');
            e.target.hidden = false;
        }
    }
    
    return (
        <div>
            <input className='manager-search' onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search manager'></input>
            <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users?.filter(x => x?.userName.toLowerCase().includes(search.toLowerCase())).map((x, idx) => {
                    return <tr key={idx}>
                        <td key={idx+"td1"}>{x.id}</td>
                        <td key={idx+"td2"}>{x.userName}</td>
                        <td key={idx+"td3"}>{x.email}</td>
                        <td key={idx+"td4"}><input onClick={(e) => delUser(e, x.id)} className='delete-btn'  key={idx+"inp"} type='button' value='Delete'></input></td>
                    </tr>
                })}
                
            </tbody>
        </table>
        </div>
        

    );
}
export default ManagerTabel;