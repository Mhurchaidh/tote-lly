import { useContext, useState } from "react"
import { ListingContext } from "../context/listing"

function Item({listing}) {

    const initialFormData = {
        name: listing.item.name,
        quantity: listing.item.quantity,
        price: listing.item.price,
        cost_of_goods: listing.item.cost_of_goods,
        condition: listing.item.condition,
        description: listing.item.description
    }

    const [listings, setListings] = useContext(ListingContext);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState(initialFormData)

    const {name, quantity, price, cost_of_goods, condition, description} = formData;

    const mappedListingSites = listing.sites.map(site => <p key={site.id}>{site.name}</p>)

    const handleEdit = () => {
        setEdit(true)
    }

    const handleDelete = () => {
        fetch(`/api/listings/${listing.id}`, {method: "DELETE"})
        setListings(listings.filter(list => list.id !== listing.id))
    }

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
        <div className="listing-card" key={listing.id}>
            {edit ?
            <form className="listing-card new-listing" onSubmit={handleSubmit}>
            <label>Sold?</label>
            <input type='checkbox'/>
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
            <button>Submit</button>
            <button id='cancel' onClick={() => setEdit(false)}>Cancel</button>
        </form>
            :
            <div>
                <p>{listing.item.name}</p>
                <em>{'$' + listing.item.price}</em>
                <p>{'Cost of goods: $' + listing.item.cost_of_goods}</p>
                <p>{listing.item.sold ? 'Sold' : 'Unsold'}</p>
                <p>{'Condition: ' + listing.item.condition}</p>
                <p>{'Description: ' + listing.item.description}</p>
                {mappedListingSites}
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>}
        </div>
    )
}

export default Item;