import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import Listing from './Listing';
import { SiteTabBar } from "./SiteTabBar";
import { SiteContext } from "../context/site";
import { StoreContext } from "../context/store";
import { CategoryContext } from "../context/category";
import { FilterContext } from "../context/filter";
import Logo from './Logo';

function HomePage() {

    const [user, setUser] = useContext(UserContext)

    const [listings, setListings] = useState([])
    const [categories, setCategories] = useContext(CategoryContext)
    const [sites, setSites] = useContext(SiteContext)
    const [stores, setStores] = useContext(StoreContext)
    const [showOptions, setShowOptions] = useState(false)
    const [filter, setFilter] = useContext(FilterContext)

    useEffect(() => {
        fetch('/api/listings')
        .then(resp => resp.json())
        .then(listings => setListings(listings))
        // .then(resp => console.log(resp))
        
        
    }, [])

    useEffect(() => {
        fetch('/api/categories')
        .then(resp => resp.json())
        .then(categories => setCategories(categories))

        fetch('/api/sites')
        .then(resp => resp.json())
        .then(sites => setSites(sites))

        fetch('/api/stores')
        .then(resp => resp.json())
        .then(stores => setStores(stores))
    }, [user])

    const handleLogout = () => {
        fetch('/api/logout', {method: "DELETE"}).then(setUser(null))
    }

    const handleOptionClick = () => {
        setShowOptions(!showOptions)
    }

    const filterListings = () => {
        if(filter !== null) {
        return listings?.map(listing => ({
            ...listing, sites: listing.sites.filter(site => site.name.includes(filter))
        }))
    } else return listings
    }

    const mappedListings = filterListings().filter(listing => listing.sites.length > 0)
    .map(listing => <Listing key={listing.id} listing={listing}/>)

    return (
        <div id='homepage'>
            <Logo handleOptionClick={handleOptionClick}/>
            {showOptions? <button onClick={handleLogout}>Logout</button> : null}
            <SiteTabBar/>
            <button>Add New Listing</button>
            {listings?<div className="listings-display">
                {listings? mappedListings : 'Loading...'}
            </div> : 'Loading...'}
        </div>
    )
}

export default HomePage;