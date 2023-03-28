import { useContext, useState, useEffect } from 'react';
import { ListingContext } from '../context/listing';
import Item from './Item';
import NewListing from './NewListing';
import { FilterContext } from '../context/filter';
import { Droppable } from 'react-beautiful-dnd';
import { SearchContext } from '../context/search';

export default function Listings() {

    const [listings, setListings] = useContext(ListingContext);
    const [newListing, setNewListing] = useState(false);
    const [filter, setFilter] = useContext(FilterContext);
    const [searchValue, setSearchValue] = useContext(SearchContext);

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

    const mappedListings = filterListings().filter(listing => listing.sites.length > 0)
    .filter(listing => listing.item.sold === false).reverse()
    .filter(listing => listing.item.name.toLowerCase().includes(searchValue.toLowerCase()) || listing.item.order_number.includes(searchValue))
    .map((listing, index) => <Item key={listing.id} listing={listing} index={index}/>)

    return (
        <Droppable droppableId='drop-listings'>
                {provided => (
                        <div className='listings-display' {...provided.droppableProps} ref={provided.innerRef}>
                            {newListing ? <NewListing handleAddClick={handleAddClick}/> : <button id='add-new' onClick={handleAddClick}>Add Listing</button>}
                            {mappedListings}
                            <div>
                                {provided.placeholder}
                            </div>
                        </div>
                )}
        </Droppable>
    )
}