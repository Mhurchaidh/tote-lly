import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { UserContext } from "../context/user";
import SiteTabBar from "./SiteTabBar";
import Logo from './Logo';
import { OptionContext } from "../context/option";

function HomePage() {

    const [user, setUser] = useContext(UserContext)
    const [showOptions, setShowOptions] = useContext(OptionContext)
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/listings')
    }, [])

    const handleLogout = () => {
        fetch('/api/logout', {method: "DELETE"}).then(setUser(null))
        setShowOptions(false)
        navigate('/')
    }

    const handleOptionClick = () => {
        setShowOptions(!showOptions)
    }

    return (
        <div id='homepage'>
            <div id='left-field'>
                <Logo handleOptionClick={handleOptionClick}/>
            </div>
            <div id='center-field'>
                {showOptions? <button onClick={handleLogout}>Logout</button> : null}
                <SiteTabBar/>
                <Outlet/>
            </div>
            <div id='right-field'>
                <Link to='listings'>Unsold</Link>
                <Link to='/sold-items'>Sold</Link>
            </div>
        </div>
    )
}

export default HomePage;