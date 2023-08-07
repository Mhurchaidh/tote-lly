import { useState, useContext } from "react";

function OptionButtons ({setEdit, setIsSold, listing}) {
    
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleEdit = () => {
        setEdit(true)
    }

    const handleDelete = () => {
        fetch(`/api/listings/${listing.id}`, {method: "DELETE"})
        setListings(listings.filter(list => list.id !== listing.id))
    }
    return (
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
    )
}
export default OptionButtons;