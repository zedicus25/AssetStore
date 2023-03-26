import './AdminTabel.css'

const AdminTabel = () => {
    
    
    
    return (
        <div>
            <input type='text' placeholder='Search admin'></input>
            <table>
            <thead>
                <tr>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>zedicus</td>
                    <td>zedicus@gmail.com</td>
                    <td><input type='button' value='Delete'></input></td>
                </tr>
            </tbody>
        </table>
        </div>
        

    );
}
export default AdminTabel;