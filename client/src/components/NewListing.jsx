import { useContext, useState } from "react"
import { ListingContext } from "../context/listing"

export default function NewListing({handleAddClick}) {

    const initialFormData = {
        name: '',
        price: '',
        description: '',
        condition: '',
        sold: false,
        cost_of_goods: '',
        quantity: 1,
        date_listed: ''
    }

    const [formData, setFormData] = useState(initialFormData);

    const [listings, setListings] = useContext(ListingContext);

    const {name, price, description, condition, sold, cost_of_goods, quantity, date_listed} = formData

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
            <label>List Date: </label>
            <input type='date'
                   name='date_listed'
                   value={date_listed}
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
                id='description'
                name='description'
                value={description}
                placeholder='...'
                onChange={handleChange}
            />
            <button>Submit</button>
            <button id='cancel' onClick={handleAddClick}>Cancel</button>
        </form>
    )
}