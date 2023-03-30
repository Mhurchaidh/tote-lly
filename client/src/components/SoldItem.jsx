import { useContext, useState } from 'react';
import { SoldItemContext } from '../context/solditems';

export default function SoldItem({item}) { 
    
    const [soldItems, setSoldItems] = useContext(SoldItemContext);

    const handleReList = () => {
        fetch(`/api/sold_items/${item.id}`, {method: "DELETE"})
        .then(setSoldItems(soldItems.filter(sItem => sItem.id !== item.id)))
    }

    return ( 
        <div className="listing-card sold-card">
             <div>
                 <button id="sold-button" onClick={handleReList}>Re-List</button>
                 <p>{item.item.name}</p>
                 <p>Order Number: {item.item.order_number}</p>
                 <p>Sold Price: {'$' + item.sell_price.toFixed(2)}</p>
                  <em>Listing Price: {'$' + item.item.price}</em>
                 <p>Date Sold: {item.date_sold.split('T')[0]}</p>
                 <p>{'Cost of goods: $' + item.item.cost_of_goods}</p>
                 <p>{item.item.sold ? 'Sold' : 'Unsold'}</p>
                 <p>{'Condition: ' + item.item.condition}</p>
                 <p>{'Description: ' + item.item.description}</p>
                 <p>Storage Location: {item.item.storage_location}</p>
                 <p>{item.site_sold}</p>
                 <div id='option-buttons'>
                 </div>
             </div>
          </div>
    )
}