import { useContext, useState, useEffect } from 'react';
import { ListingContext } from '../context/listing';
import Item from './Item';
import NewListing from './NewListing';
import { FilterContext } from '../context/filter';

export default function Listings() {

    const [listings, setListings] = useContext(ListingContext);
    const [newListing, setNewListing] = useState(false);
    const [filter, setFilter] = useContext(FilterContext);


    useEffect(() => {
        fetch('/api/listings')
        .then(resp => resp.json())
        .then(listings => setListings(listings))
    }, [])


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

    const mappedListings = filterListings().filter(listing => listing.sites.length > 0).filter(listing => listing.item.sold === false)
    .map(listing => <Item key={listing.id} listing={listing}/>)

    return (
        <div className='listings-display'>
            {newListing ? <NewListing handleAddClick={handleAddClick}/> : <button id='add-new' onClick={handleAddClick}>Add Listing</button>}
            {mappedListings}
        </div>
    )
}