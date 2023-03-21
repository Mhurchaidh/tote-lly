import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import Listing from './Listing';
import TotellyLogo from '../images/TotellyLogo.png';

function HomePage() {

    const [user, setUser] = useContext(UserContext)
    const [listings, setListings] = useState([])
    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        fetch('/api/listings')
        .then(resp => resp.json())
        .then(listings => setListings(listings))
    }, [])

    const handleLogout = () => {
        fetch('/api/logout', {method: "DELETE"}).then(setUser(null))
    }

    const handleOptionClick = () => {
        setShowOptions(!showOptions)
    }

    const mappedListings = listings?.map(listing => {
        return <Listing key={listing.id} listing={listing}/>
    })

    return (
        <div id='homepage'>
            <img id='user' src={TotellyLogo} onClick={handleOptionClick}/>
            {showOptions? <button onClick={handleLogout}>Logout</button> : null}
            <div className="listings-display">
                {listings? mappedListings : 'Loading...'}
            </div>
        </div>
    )
}

export default HomePage;