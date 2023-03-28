import { useContext, useState } from "react"
import { ListingContext } from "../context/listing"
import { SiteContext } from "../context/site"
import { SoldItemContext } from "../context/solditems"

export default function SoldForm({listing, setIsSold}) {

    const initialFormData = {
        listing_id: listing.id,
        state: '',
        sell_price: 0,
        shipping_cost: 0,
        customer_name: '',
        date_sold: '',
        store_sold: '',
        site_sold: listing.sites[0].name,
        // customer_review: '',
        // refunded: false,
        quantity_sold: 0
    }

    const [soldItems, setSoldItems] = useContext(SoldItemContext)
    const [listings, setListings] = useContext(ListingContext)
    const [formData, setFormData] = useState(initialFormData)
    const {listing_id, state, sell_price, shipping_cost, customer_name, date_sold, store_sold, site_sold, customer_review, refunded, quantity_sold} = formData

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData((formData) => ({...formData, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch('/api/sold_items', config)
        .then(resp => resp.json())
        .then(resp => {
            setSoldItems([...soldItems, resp])
            setListings(listings.filter(item => item.id !== resp.listing.id))
            console.log(resp)
        })
    }

    const mappedSites = listing.sites?.map(site => {
        return <option value={site.name} key={site.id}>{site.name}</option>
    })

    return (
        <div id='sold-form-container'>
            <form id='sold-form' onSubmit={handleSubmit}>
                <label>State</label>
                <input 
                    name='state'
                    value={state}
                    placeholder='...'
                    onChange={handleChange}
                    />
                <label>Sell Price: </label>
                <input 
                    name='sell_price'
                    value={sell_price}
                    placeholder='...'
                    onChange={handleChange}
                    />
                <label>Shipping Cost: </label>
                <input 
                    name='shipping_cost'
                    value={shipping_cost}
                    placeholder='...'
                    onChange={handleChange}
                    />
                <label>Customer Name: </label>
                <input 
                    name='customer_name'
                    value={customer_name}
                    placeholder='...'
                    onChange={handleChange}
                    />
                <label>Date Sold: </label>
                <input 
                    type='date'
                    name='date_sold'
                    value={date_sold}
                    placeholder='...'
                    onChange={handleChange}
                    />
                <label>Site Sold: </label>
                <select name='site_sold'
                        value={site_sold}
                        onChange={handleChange}
                        >
                    {mappedSites}
                </select>
                <label>Quantity Sold: </label>
                <input 
                    name='quantity_sold'
                    value={quantity_sold}
                    placeholder='...'
                    onChange={handleChange}
                    />
                <button id='cancel' onClick={() => setIsSold(false)}>Cancel</button>
                <button>Submit</button>
            </form>
            <div id='listing-info'>
                <div>Item Name: {listing.item.name}</div>
                <div>Order Number: {listing.item.order_number}</div>
                <div>Storage Location: {listing.item.storage_location}</div>
                <div>Price: {listing.item.price}</div>
                <div>Condition: {listing.item.condition}</div>
                <div>Cost of Goods: {listing.item.cost_of_goods}</div>
                <div>Quantity: {listing.item.quantity}</div>
                <div>Date Listed: {listing.item.date_listed.split('T')[0]}</div>
                <div className='description'>Description: {listing.item.description}</div>
            </div>
        </div>
    )
}