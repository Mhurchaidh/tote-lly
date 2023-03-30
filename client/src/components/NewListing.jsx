import { useContext, useState } from "react"
import { CategoryContext } from "../context/categories";
import { ListingContext } from "../context/listing"
import SoldItems from "./SoldItemsPage";
import { SiteContext } from "../context/site";

export default function NewListing({handleAddClick}) {

    const initialFormData = {
        name: '',
        order_number: '',
        price: '',
        description: '',
        condition: '',
        sold: false,
        cost_of_goods: '',
        quantity: 1,
        date_listed: '',
        category: '',
        storage_location: '',
        site: '',
    }

    const [formData, setFormData] = useState(initialFormData);

    const [listings, setListings] = useContext(ListingContext);

    const [categories, setCategories] = useContext(CategoryContext);

    const [sites, setSites] = useContext(SiteContext);

    const {name, order_number, price, description, condition, sold, cost_of_goods, quantity, date_listed, category, storage_location, site} = formData

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

        fetch('/api/listings', config)
        .then(resp => resp.json())
        .then(listing => setListings([...listings, listing]))
        handleAddClick();
    }

    const mappedCategories = categories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)
    const mappedSites = sites?.map(site => <option key={site.id} value={site.name}>{site.name}</option>)

    return (
        <form className="listing-card new-listing" onSubmit={handleSubmit}>
            <label>Item Name:</label>
            <input 
                name='name'
                value={name}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
            />
            <label>Order Number: </label>
            <input name='order_number'
                   value={order_number}
                   placeholder='...'
                   onChange={handleChange}
                   autoComplete='off'
                   />
            <label>Quantity</label>
            <input 
                name='quantity'
                value={quantity}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
            />
            <label>Price:</label>
            <input 
                name='price'
                value={price}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
                />
            <label>Cost of Goods:</label>
            <input 
                name='cost_of_goods'
                value={cost_of_goods}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
            />
            <label>Category: </label>
            <select onChange={handleChange} name='category' value={category}>
                {mappedCategories}
            </select>
            <label>List Date: </label>
            <input type='date'
                   name='date_listed'
                   value={date_listed}
                   onChange={handleChange}
                   autoComplete='off'
                   />
            <label>Storage Location: </label>
            <input
                name='storage_location'
                value={storage_location}
                onChange={handleChange}
                autoComplete='off'
            />
            <label>Site: </label>
            <select onChange={handleChange} name="site" value={site}>
                {mappedSites}
            </select>
            <label>Condition:</label>
            <input 
                id='condition'
                name='condition'
                value={condition}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
            />
            <label>Description:</label>
            <textarea 
                type='text'
                id='description'
                name='description'
                value={description}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
            />
            <button>Submit</button>
            <button id='cancel' onClick={handleAddClick}>Cancel</button>
        </form>
    )
}