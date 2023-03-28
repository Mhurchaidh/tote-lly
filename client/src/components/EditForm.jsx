import { useState, useContext } from "react";
import { ListingContext } from "../context/listing";

export default function EditForm({listing, setEdit}) {

    const initialFormData = {
        sold: listing.item.sold,
        name: listing.item.name,
        quantity: listing.item.quantity,
        price: listing.item.price,
        cost_of_goods: listing.item.cost_of_goods,
        condition: listing.item.condition,
        description: listing.item.description
    }

    const [formData, setFormData] = useState(initialFormData);
    const {sold, name, quantity, price, cost_of_goods, condition, description} = formData;
    const [listings, setListings] = useContext(ListingContext);


    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData((formData) => ({...formData, [name]: value}))
    }

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
        <form className="listing-card new-listing" onSubmit={handleSubmit}>
                        <label>Item Name:</label>
                        <input 
                            name='name'
                            value={name}
                            placeholder='...'
                            onChange={handleChange}
                        />
                        <label>Quantity</label>
                        <input 
                            name='quantity'
                            value={quantity}
                            placeholder='...'
                            onChange={handleChange}
                        />
                        <label>Price:</label>
                        <input 
                            name='price'
                            value={price}
                            placeholder='...'
                            onChange={handleChange}
                            />
                        <label>Cost of Goods:</label>
                        <input 
                            name='cost_of_goods'
                            value={cost_of_goods}
                            placeholder='...'
                            onChange={handleChange}
                        />
                        <label>Condition:</label>
                        <input 
                            id='condition'
                            name='condition'
                            value={condition}
                            placeholder='...'
                            onChange={handleChange}
                        />
                        <label>Description:</label>
                        <textarea 
                            type='text'
                            className='description'
                            name='description'
                            value={description}
                            placeholder='...'
                            onChange={handleChange}
                        />
                        <button>Submit</button>
                        <button id='cancel' onClick={() => setEdit(false)}>Cancel</button>
                    </form>
    )
}