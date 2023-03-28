import { useContext, useState, useEffect } from 'react';
import { ListingContext } from '../context/listing';
import Item from './Item';
import NewListing from './NewListing';
import { FilterContext } from '../context/filter';
import { Droppable } from 'react-beautiful-dnd';
import { SearchContext } from '../context/search';
import { SoldItemContext } from '../context/solditems';
import { StatsContext } from '../context/stats';
import { Outlet } from 'react-router-dom';
import { CategoryFilterContext } from '../context/categoryfilter';

export default function Listings() {

    const [listings, setListings] = useContext(ListingContext);
    const [soldItems, setSoldItems] = useContext(SoldItemContext);
    const [newListing, setNewListing] = useState(false);
    const [filter, setFilter] = useContext(FilterContext);
    const [searchValue, setSearchValue] = useContext(SearchContext);
    const [categoryFilter, setCategoryFilter] = useContext(CategoryFilterContext);
    const [stats, setStats] = useContext(StatsContext);
    
    // useEffect(() => {
    //     fetch('/api/listings')
    //     .then(resp => resp.json())
    //     .then(listings => setListings(listings))
    //     fetch('/api/sold_items')
    //     .then(resp => resp.json())
    //     .then(resp => {setSoldItems(resp)})
    // }, [])

    useEffect(() => {
        calculateStats()
    }, [listings, soldItems])

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

    // const categoryFilteredListings = () => {
    //     if(categoryFilter !== null) {
    //         return filterListings().map(listing => ({
    //             ...listing, categories: listing.categories.filter(category => category.name.includes(categoryFilter))
    //         }))
    //     } else return filterListings()
    // }

    const calculateStats = () => {
        const grossIncome = soldItems?.reduce((a,v) => a + v.sell_price, 0)
        const costOfGoods = listings?.reduce((a,v) => a + v.item.cost_of_goods, 0)
        const totalShipping = soldItems?.reduce((a,v) => a + v.shipping_cost, 0)
        setStats((stats) => ({...stats, gross_income: grossIncome, cost_of_goods: costOfGoods, total_shipping: totalShipping}))
    }

    const mappedListings = filterListings().filter(listing => listing.sites.length > 0)
    .filter(listing => listing.item.sold === false).reverse()
    .filter(listing => listing.item.name.toLowerCase().includes(searchValue.toLowerCase()) || listing.item.order_number.includes(searchValue))
    .filter(listing => categoryFilter !== 'all' ? listing.categories[0].name.includes(categoryFilter) : listing)
    .map((listing, index) => <Item key={listing.id} listing={listing} index={index}/>)

    return (
        <div>
            <Outlet/>
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
        </div>
    )
}