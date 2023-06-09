import { useContext, useEffect } from "react"
import { FilterContext } from "../context/filter"
import { ListingContext } from "../context/listing"
import SoldItem from './SoldItem';
import { SoldItemContext } from "../context/solditems";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/search";
import CategoryFilter from "./CategoryFilter";
import { CategoryFilterContext } from "../context/categoryfilter";


export default function SoldItems() {

    const [filter, setFilter] = useContext(FilterContext)
    const [soldItems, setSoldItems] = useContext(SoldItemContext)
    const [searchValue, setSearchValue] = useContext(SearchContext)
    const [filterCategory, setFilteredCategory] = useContext(CategoryFilterContext)

    const navigate = useNavigate()

    useEffect(() => {
        // fetch('/api/sold_items')
        // .then(resp => resp.json())
        // .then(resp => {setSoldItems(resp)})
        // if(soldItems.length <= 0)
        //     navigate('/listings')
    }, [])

    const filterListings = () => {
        if(filter !== null) {
        return soldItems.filter(item => item.site_sold === filter)
    } else return soldItems
    }

    const categoryFilterSold = () => {
        if(filterCategory !== 'all') {
            return filterListings().filter(soldItem => soldItem.categories[0].name.toLowerCase().includes(filterCategory.toLowerCase()))
        } else return filterListings()
    }

    const mappedSoldItems = categoryFilterSold()
    .filter(listing => listing.item.name.toLowerCase().includes(searchValue.toLowerCase()) || listing.item.order_number.includes(searchValue)).reverse()
    .map((item) => <SoldItem key={item.id} item={item}/>)

    return (
        <div className="listings-display">
            {mappedSoldItems}
        </div>
    )
}