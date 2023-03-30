import { useContext, useState } from "react";
import { CategoryContext } from "../context/categories";
import { ListingContext } from "../context/listing";
import EditForm from "./EditForm";
import SoldForm from "./SoldForm";
import { motion } from 'framer-motion';

function Item({listing}) {

    const [edit, setEdit] = useState(false);
    const [isSold, setIsSold] = useState(false);
    const [listings, setListings] = useContext(ListingContext);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const mappedListingSites = listing.sites.map(site => <div key={site.id}>{site.name}</div>)

    const handleEdit = () => {
        setEdit(true)
    }

    const handleDelete = () => {
        fetch(`/api/listings/${listing.id}`, {method: "DELETE"})
        setListings(listings.filter(list => list.id !== listing.id))
    }

    return (
        <div>
            {edit ?
            <EditForm listing={listing} setEdit={setEdit}/>
            :
            isSold? 
            <SoldForm listing={listing} setIsSold={setIsSold}/>
            : 
            <motion.div className="listing-card" whileHover={{scale: 1.02}} onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)}>
                <div id='option-buttons'>
                 <button id="sold-button" onClick={() => setIsSold(true)}>Sell</button>
                    {confirmDelete ? 
                    <button id='confirm-delete-button' onClick={handleDelete}>Confirm</button>
                    : 
                     <button className='edit-button' onClick={handleEdit}>Edit</button>}
                     {confirmDelete ? 
                     <button id='cancel-delete-button' onClick={() => setConfirmDelete(false)}>Cancel</button>
                      :
                         <button className='delete-button' onClick={() => setConfirmDelete(true)}>Delete</button>}
                 </div>
                 <strong style={{fontSize: '20px'}}>{listing.item.name}</strong>
                 <strong>Order Number: {listing.item.order_number}</strong>
                 <em>Listing Price: {'$' + listing.item.price.toFixed(2)}</em>
                 <div>List Date: {listing.item.date_listed.split('T')[0]}</div>
                 <div>{'Cost of goods: $' + listing.item.cost_of_goods.toFixed(2)}</div>
                 { showDetails ?
                    <div>
                        <div>{listing.item.sold ? 'Sold' : 'Unsold'}</div>
                        <div>{'Condition: ' + listing.item.condition}</div>
                        <div className='description'>{'Description: ' + listing.item.description}</div>
                        {mappedListingSites}
                        <div>{listing.categories.length >= 1 ? listing.categories[0].name : null}</div>
                    </div>
                    :null
                 }
                 <strong>Storage Location: {listing.item.storage_location}</strong>
              </motion.div>}
         </div>
    )
}

export default Item;