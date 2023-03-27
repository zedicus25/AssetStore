import { useState } from 'react';
import './CreateAdminComponent.css'
import api from '../../apiAccess';

const CreateAdminComponent = () => {

    const [newAdmin, setNewAdmin] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin({ ...newAdmin, [name]: value });

    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
            errors.username = "Login must contains only letters and numbers!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be more than 6 characters";
        } else if (values.password.length > 20) {
            errors.password = "Password cannot exceed more than 20 characters";
        }
        else if (!/\d/.test(values.password)) {
            errors.password = "Password must contain one digit"
        }
        else if (!/[a-z]/.test(values.password)) {
            errors.password = "Password must contain one lower case letter"
        }
        else if (!/[A-Z]/.test(values.password)) {
            errors.password = "Password must contain one upper case letter"
        }
        else if (!/[!@#\$%\^\&*\)\(+=._-]/.test(values.password)) {
            errors.password = "Password must contain one special symbol";
        }
        if (values.password !== values.passwordConfirm)
            errors.passwordConfirm = "Passwords not equals";
        return errors;
    };

    const register = async (e) => {
        e.preventDefault();
        setFormErrors(validate(newAdmin));
        if (Object.keys(formErrors).length == 0) {
            const res = await api.addAdmin(newAdmin.username, newAdmin.email, newAdmin.password);
            if (res == undefined) {
                alert("Try Later")
                return;
            }
            if (res.status == '200') {
                alert("Successful!")
                setNewAdmin({});
                setFormErrors({});
            }

        }
    }

    return (
        <div className="admin-registration">
            <h2>Register admin:</h2>
            <form>
                <label htmlFor="name">Login:</label>
                <input onChange={(e) => handleChange(e)} type="text" name="username" required />
                <p className='error-text'>{formErrors.username}</p>

                <label htmlFor="email">Email:</label>
                <input onChange={(e) => handleChange(e)} type="email" name="email" required />
                <p className='error-text'>{formErrors.email}</p>

                <label htmlFor="password">Password:</label>
                <input onChange={(e) => handleChange(e)} type="password" name="password" required />
                <p className='error-text'>{formErrors.password}</p>

                <label htmlFor="password">Password repeat:</label>
                <input type="password" name="passwordConfirm" required />
                <p className='error-text'>{formErrors.passwordConfirm}</p>

                <button onClick={(e) => register(e)}>Register admin</button>
            </form>
        </div>
    );
}

export default CreateAdminComponent;