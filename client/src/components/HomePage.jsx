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
import NewListing from "./NewListing";

function HomePage() {

    const [user, setUser] = useContext(UserContext)

    const [listings, setListings] = useState([])
    // const [categories, setCategories] = useContext(CategoryContext)
    // const [sites, setSites] = useContext(SiteContext)
    // const [stores, setStores] = useContext(StoreContext)
    const [showOptions, setShowOptions] = useState(false)
    const [filter, setFilter] = useContext(FilterContext)
    const [newListing, setNewListing] = useState(false)

    useEffect(() => {
        fetch('/api/listings')
        .then(resp => resp.json())
        .then(listings => setListings(listings))

        // fetch('/api/categories')
        // .then(resp => resp.json())
        // .then(categories => setCategories(categories))

        // fetch('/api/sites')
        // .then(resp => resp.json())
        // .then(sites => setSites(sites))

        // fetch('/api/stores')
        // .then(resp => resp.json())
        // .then(stores => setStores(stores))
    }, [])

    const handleLogout = () => {
        fetch('/api/logout', {method: "DELETE"}).then(setUser(null))
    }

    const handleOptionClick = () => {
        setShowOptions(!showOptions)
    }

    const handleAddClick = () => {
        setNewListing(!newListing)
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
            {listings?<div className="listings-display">
            {newListing ? <NewListing handleAddClick={handleAddClick}/> : <button id='add-new' onClick={handleAddClick}>Add Listing</button>}
                {listings? mappedListings : 'Loading...'}
            </div> : 'Loading...'}
        </div>
    )
}

export default HomePage;