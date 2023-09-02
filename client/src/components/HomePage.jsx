import { useContext, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { UserContext } from "../context/user";
import SiteTabBar from "./SiteTabBar";
import Logo from './Logo';
import { OptionContext } from "../context/option";
import { SoldItemContext } from "../context/solditems";
import { ListingContext } from "../context/listing";

function HomePage() {

    const [user, setUser] = useContext(UserContext)
    const [showOptions, setShowOptions] = useContext(OptionContext)
    const [soldItems, setSoldItems] = useContext(SoldItemContext)
    const [listings, setListings] = useContext(ListingContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/listings')
        .then(resp => resp.json())
        .then(listings => setListings(listings))
        fetch('/api/sold_items')
        .then(resp => resp.json())
        .then(resp => {setSoldItems(resp)})
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
        <header id='homepage'>
            <div id='left-field'>
                <Logo handleOptionClick={handleOptionClick}/>
                {showOptions? <button onClick={handleLogout}>Logout</button> : null}
            </div>
            <div id='center-field'>
                <SiteTabBar/>
                <Outlet/>
            </div>
            <div id='right-field'>
            <div id='sold-toggle-buttons'>
                <button><Link to='listings'>Unsold</Link></button>
                <button><Link style={{pointerEvents: soldItems.length <= 0 ? 'none' : ''}} to='/sold-items'>Sold</Link></button>
            </div>
            </div>
        </header>
    )
}

export default HomePage;