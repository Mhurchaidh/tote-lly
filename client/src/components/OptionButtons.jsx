import { useState, useContext } from "react";
import Garbage from "../images/Garbage.png";
import Edit from "../images/Edit.png";

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
                    <div className='edit-button' onClick={handleEdit}>
                        <img src={Edit}/>
                    </div>}
                     {confirmDelete ? 
                     <button id='cancel-delete-button' onClick={() => setConfirmDelete(false)}>Cancel</button>
                      :
                      <div className='delete-button' onClick={() => setConfirmDelete(true)}>
                         <img src={Garbage}/>
                      </div>}
                 </div>
    )
}
export default OptionButtons;