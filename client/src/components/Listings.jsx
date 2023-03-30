import { useContext, useState, useEffect } from 'react';
import { ListingContext } from '../context/listing';
import Item from './Item';
import NewListing from './NewListing';
import { FilterContext } from '../context/filter';
import { SearchContext } from '../context/search';
import { SoldItemContext } from '../context/solditems';
import { StatsContext } from '../context/stats';
import { Outlet } from 'react-router-dom';
import { CategoryFilterContext } from '../context/categoryfilter';
import { motion } from 'framer-motion';

export default function Listings() {

    const [listings, setListings] = useContext(ListingContext);
    const [soldItems, setSoldItems] = useContext(SoldItemContext);
    const [newListing, setNewListing] = useState(false);
    const [filter, setFilter] = useContext(FilterContext);
    const [searchValue, setSearchValue] = useContext(SearchContext);
    const [categoryFilter, setCategoryFilter] = useContext(CategoryFilterContext);
    const [stats, setStats] = useContext(StatsContext);

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
    .map((listing) => <Item key={listing.id} listing={listing}/>)

    return (
        <div>
            <motion.div className='listings-display' whileHover={{overflow: 'auto'}}>
                {newListing ? <NewListing handleAddClick={handleAddClick}/> : <motion.button id='add-new' onClick={handleAddClick}>Add Listing</motion.button>}
                {mappedListings}
            </motion.div>
            <Outlet/>
        </div>
    )
}