import { useState } from "react"

export default function NewListing({handleAddClick}) {

    const initialFormData = {
        name: '',
        price: 0.00,
        description: '',
        condition: '',
        sold: false,
        cost_of_goods: 0.00,
        quantity: 0,
        date_listed: ''
    }

    const [formData, setFormData] = useState(initialFormData)

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
        .then(resp => {
            if(resp.ok) {
                resp.json().then((user) => setUser(user))
            }
            // else resp.json().then((errors) => setErrors(errors))
        })
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
                id='description'
                name='description'
                value={description}
                placeholder='...'
                onChange={handleChange}
            />
            <button id='cancel' onClick={handleAddClick}>Cancel</button>
        </form>
    )
}