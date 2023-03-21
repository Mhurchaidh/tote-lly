function Listing({listing}) {

    return (
        <div className="listing-card" key={listing.id}>
                <p>{listing.item.name}</p>
                <em>{'$' + listing.item.price}</em>
                <p>{'Description: ' + listing.item.description}</p>
                <p>{'Condition: ' + listing.item.condition}</p>
                <p>{listing.item.sold ? 'Sold' : 'Unsold'}</p>
                <p>{'Cost of goods: $' + listing.item.cost_of_goods}</p>
            </div>
    )
}

export default Listing;