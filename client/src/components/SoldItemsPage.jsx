import { useContext } from "react"
import { Link } from "react-router-dom"
import { FilterContext } from "../context/filter"
import { ListingContext } from "../context/listing"
import Logo from './Logo';
import Listing from './Item';
import SiteTabBar from "./SiteTabBar";
import { OptionContext } from "../context/option";

export default function SoldItems() {

    const [filter, setFilter] = useContext(FilterContext)
    const [listings, setListings] = useContext(ListingContext)
    const [showOptions, setShowOptions] = useContext(OptionContext)

    const handleOptionClick = () => {
        setShowOptions(!showOptions)
    }

    const handleLogout = () => {
        fetch('/api/logout', {method: "DELETE"}).then(setUser(null))
    }

    const filterListings = () => {
        if(filter !== null) {
        return listings?.map(listing => ({
            ...listing, sites: listing.sites.filter(site => site.name.includes(filter))
        }))
    } else return listings
    }

    const mappedListings = filterListings().filter(listing => listing.sites.length > 0).filter(listing => listing.item.sold === true)
    .map(listing => <Listing key={listing.id} listing={listing}/>)

    return (
        <div className="listings-display">
            {mappedListings}
        </div>
    )
}