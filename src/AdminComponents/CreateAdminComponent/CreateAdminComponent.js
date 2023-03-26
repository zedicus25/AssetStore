import './CreateAdminComponent.css'

const CreateAdminComponent = () => {
    return (
        <div className="admin-registration">
            <h2>Register admin:</h2>
            <form>
                <label htmlFor="name">Login:</label>
                <input type="text" name="login" required />

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password"  name="password" required />

                <button type="submit">Register admin</button>
            </form>
        </div>
    );
}

export default CreateAdminComponent;