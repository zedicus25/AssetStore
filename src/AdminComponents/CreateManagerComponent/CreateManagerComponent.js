import './CreateManagerComponent.css'

const CreateManagerComponent = () => {
    return (
        <div className="manager-registration">
            <h2>Register manager:</h2>
            <form>
                <label htmlFor="name">Login:</label>
                <input type="text" name="login" required />

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input type="password"  name="password" required />

                <button type="submit">Register manager</button>
            </form>
        </div>
    );
}

export default CreateManagerComponent;