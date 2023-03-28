import { useContext, useState } from "react"
import { Draggable } from 'react-beautiful-dnd';
import { CategoryContext } from "../context/categories";
import { ListingContext } from "../context/listing";
import EditForm from "./EditForm";
import SoldForm from "./SoldForm";

function Item({listing, index}) {

    const [edit, setEdit] = useState(false);
    const [isSold, setIsSold] = useState(false);
    const [listings, setListings] = useContext(ListingContext);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const mappedListingSites = listing.sites.map(site => <p key={site.id}>{site.name}</p>)

    const handleEdit = () => {
        setEdit(true)
    }

    const handleDelete = () => {
        fetch(`/api/listings/${listing.id}`, {method: "DELETE"})
        setListings(listings.filter(list => list.id !== listing.id))
    }

    return (
        <Draggable draggableId={listing.id.toString()} index={index}>
                {provided => (
                    <div className="listing-card" key={listing.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {edit ?
                        <EditForm listing={listing} setEdit={setEdit}/>
                        :
                        isSold? 
                        <SoldForm listing={listing} setIsSold={setIsSold}/>
                        : 
                        <div>
                            <div id='option-buttons'>
                            <button className="sold-button" onClick={() => setIsSold(true)}>Sell</button>
                                {confirmDelete ? 
                                <button id='confirm-delete-button' onClick={handleDelete}>Confirm</button>
                                : 
                                <button className='edit-button' onClick={handleEdit}>Edit</button>}
                                {confirmDelete ? 
                                <button id='cancel-delete-button' onClick={() => setConfirmDelete(false)}>Cancel</button>
                                :
                                <button className='delete-button' onClick={() => setConfirmDelete(true)}>Delete</button>}
                            </div>
                            <p>{listing.item.name}</p>
                            <p>Order Number: {listing.item.order_number}</p>
                            <em>Listing Price: {'$' + listing.item.price.toFixed(2)}</em>
                            <p>List Date: {listing.item.date_listed.split('T')[0]}</p>
                            <p>{'Cost of goods: $' + listing.item.cost_of_goods.toFixed(2)}</p>
                            <p>{listing.item.sold ? 'Sold' : 'Unsold'}</p>
                            <p>{'Condition: ' + listing.item.condition}</p>
                            <p>{'Description: ' + listing.item.description}</p>
                            <p>Storage Location: {listing.item.storage_location}</p>
                            {mappedListingSites}
                            <p>{listing.categories.length >= 1 ? listing.categories[0].name : null}</p>
                        </div>}
                    </div>
                )}

            </Draggable>
    )
}

export default Item;