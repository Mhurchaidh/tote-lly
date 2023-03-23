import { useContext } from "react"
import { FilterContext } from "../context/filter"
import { ListingContext } from "../context/listing"
import Item from './Item';

export default function SoldItems() {

    const [filter, setFilter] = useContext(FilterContext)
    const [listings, setListings] = useContext(ListingContext)

    const filterListings = () => {
        if(filter !== null) {
        return listings?.map(listing => ({
            ...listing, sites: listing.sites.filter(site => site.name.includes(filter))
        }))
    } else return listings
    }

    const mappedListings = filterListings().filter(listing => listing.sites.length > 0).filter(listing => listing.item.sold === true)
    .map(listing => <Item key={listing.id} listing={listing}/>)

    return (
        <div className="listings-display">
            {mappedListings}
        </div>
    )
}