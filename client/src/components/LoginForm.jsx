import { useContext, useState } from "react";
import { UserContext } from "../context/user";

function LoginForm() {

    const initialFormData = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialFormData)

    const [user, setUser] = useContext(UserContext)

    const {username, password} = formData

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch('/api/login', config)
        .then((resp) => {
            if(resp.ok) {
                resp.json().then((user) => setUser(user))
            } 
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form className="account-access-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input 
                        placeholder='...'
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        placeholder='...'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;