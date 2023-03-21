import { useState } from 'react';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Login() {

    const [newUser, setNewUser] = useState(false)

    return (
        <div className="account-access">
            <h1>Tote-lly</h1>
            <div>
                {!newUser ? <LoginForm/> : <SignUpForm/>}
                    {!newUser ? 
                    (<div>
                        <p>Don't have an account?</p>
                        <a onClick={() => setNewUser(true)}>Sign Up</a>
                    </div>) : 
                    (<div>
                        <p>Already have an account?</p>
                        <a onClick={() => setNewUser(false)}>Back To Login</a>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Login;