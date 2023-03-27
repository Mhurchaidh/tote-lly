import { Draggable } from 'react-beautiful-dnd';
import EditForm from './EditForm';
import { useContext, useState } from 'react';
import { SoldItemContext } from '../context/solditems';

export default function SoldItem({item, index}) { 

    const [edit, setEdit] = useState(false);
    const [soldItems, setSoldItems] = useContext(SoldItemContext);

    const handleEdit = () => {
        setEdit(true)
    }

    const handleReList = () => {
        fetch(`/api/sold_items/${item.id}`, {method: "DELETE"})
        .then(setSoldItems(soldItems.filter(sItem => sItem.id !== item.id)))
    }

    return ( 
        <Draggable draggableId={item.id.toString()} index={index}>
                {provided => (
                    <div className="listing-card" key={item.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {/* {edit ?
                        <EditForm listing={listing} setEdit={setEdit}/>
                        : */}
                        <div>
                            <button className="sold-button" onClick={handleReList}>Re-List</button>
                            <p>{item.item.name}</p>
                            <p>Order Number: {item.item.order_number}</p>
                            <em>Listing Price: {'$' + item.item.price}</em>
                            <p>Date Sold: {item.date_sold.split('T')[0]}</p>
                            <p>{'Cost of goods: $' + item.item.cost_of_goods}</p>
                            <p>{item.item.sold ? 'Sold' : 'Unsold'}</p>
                            <p>{'Condition: ' + item.item.condition}</p>
                            <p>{'Description: ' + item.item.description}</p>
                            <p>Storage Location: {item.item.storage_location}</p>
                            <p>{item.site_sold}</p>
                            {/* {mappedListingSites} */}
                            <div id='option-buttons'>
                                {/* <button className='edit-button' onClick={handleEdit}>Edit</button>
                                <button className='delete-button' onClick={handleDelete}>Delete</button> */}
                            </div>
                        </div>
                        {/* } */}
                    </div>
                )}

            </Draggable>
    )
}