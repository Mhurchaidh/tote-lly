import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { UserContext } from "../context/user";
import SiteTabBar from "./SiteTabBar";
import Logo from './Logo';
import { OptionContext } from "../context/option";
import { ListingContext } from "../context/listing";
import { SoldItemContext } from "../context/solditems";

function HomePage() {

    const [user, setUser] = useContext(UserContext)
    const [showOptions, setShowOptions] = useContext(OptionContext)
    const [soldItems, _] = useContext(SoldItemContext)

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
                <Link to='listings'><button>Unsold</button></Link>
                <Link style={{pointerEvents: soldItems.length <= 0 ? 'none' : ''}} to='/sold-items'><button>Sold</button></Link>
            </div>
        </div>
    )
}

export default HomePage;