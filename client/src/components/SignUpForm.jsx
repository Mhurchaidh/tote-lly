import { useContext, useState } from "react";
import { UserContext } from "../context/user";

function SignUpForm() {
    
    const [_, setUser] = useContext(UserContext);

    const initialFormData = {
        username: '',
        password: '',
        password_confirmation: ''
    }

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState([]);

    const {username, password, password_confirmation} = formData;

    const listedErrors = errors.map(error => {
        return <li>{error}</li>
    })

    const handleChange =(e) => {
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

        fetch('/api/signup', config)
        .then(resp => {
            if(resp.ok) {
                resp.json().then((user) => setUser(user))
            }
            else resp.json().then((errors) => setErrors(errors))
        })
    }

    return (
        <div>
            <h2>Signup</h2>
            <form className="account-access-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input 
                        placeholder="..."
                        type='text'
                        name='username'
                        autoComplete="off"
                        value={username}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        placeholder="..."
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label>Password Confirmation: </label>
                    <input 
                        placeholder="..."
                        type='password'
                        name='password_confirmation'
                        value={password_confirmation}
                        onChange={handleChange}
                        />
                </div>
                <button>Submit</button>
            </form>
                <ul>
                    {listedErrors}
                </ul>
        </div>
    )
}

export default SignUpForm;