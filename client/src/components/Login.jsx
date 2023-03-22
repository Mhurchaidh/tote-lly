import { useState } from 'react';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import Totelly from '../videos/Totelly.mp4'

function Login() {

    const [newUser, setNewUser] = useState(false)

    return (
        <div>
            <video id='login-video-logo' src={Totelly} width='20%' height='20%' preload='auto' autoPlay muted/>
            <div className="account-access">
                {/* <h1>Tote-lly</h1> */}
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
        </div>
    )
}

export default Login;