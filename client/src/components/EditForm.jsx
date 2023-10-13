import { useState, useContext } from "react";
import { CategoryContext } from "../context/categories";
import { ListingContext } from "../context/listing";
import { SiteContext } from "../context/site";

export default function EditForm({listing, setEdit}) {

    const initialFormData = {
        sold: listing.item.sold,
        name: listing.item.name,
        quantity: listing.item.quantity,
        price: listing.item.price,
        cost_of_goods: listing.item.cost_of_goods,
        condition: listing.item.condition,
        description: listing.item.description,
        order_number: listing.item.order_number,
        date_listed: listing.item.date_listed,
        // category: listing.categories[0].name,
        // site: listing.sites[0].name,
        storage_location: listing.item.storage_location
    }

    const [formData, setFormData] = useState(initialFormData);
    const {sold, name, quantity, price, cost_of_goods, condition, description, order_number, date_listed, category, site, storage_location} = formData;
    const [listings, setListings] = useContext(ListingContext);
    const [categories, setCategories] = useContext(CategoryContext);
    const [sites, setSites] = useContext(SiteContext);


    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData((formData) => ({...formData, [name]: value}))
    }

    const mappedCategories = categories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)
    const mappedSites = sites?.map(site => <option key={site.id} value={site.name}>{site.name}</option>)

    const handleSubmit = (e) => {

        e.preventDefault();

        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(`/api/listings/${listing.id}`, config)
        .then(resp => resp.json())
        .then(resp => setListings(listings.map(listing => listing.id === resp.id ? resp : listing)))
        .then(setEdit(false))
    }

    return (
        <form className="listing-card edit-listing" onSubmit={handleSubmit}>
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
            <label>List Date: </label>
            <input type='date'
                   name='date_listed'
                   value={date_listed}
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
            {/* <label>Category: </label>
            <select onChange={handleChange} name='category' value={category}>
                {mappedCategories}
            </select>
            <label>Storage Location: </label>
            <input
                name='storage_location'
                value={storage_location}
                onChange={handleChange}
                autoComplete='off'
            /> */}
            {/* <label>Site: </label>
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
            /> */}
            {/* <label>Description:</label>
            <textarea 
                type='text'
                id='description'
                name='description'
                value={description}
                placeholder='...'
                onChange={handleChange}
                autoComplete='off'
            />         */}
            <button>Submit</button>
            <button id='cancel' onClick={() => setEdit(false)}>Cancel</button>
        </form>
    )
}