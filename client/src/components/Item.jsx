function Listing({listing}) {

    const mappedListingSites = listing.sites.map(site => <p key={site.id}>{site.name}</p>)

    return (
        <div className="listing-card" key={listing.id}>
                <p>{listing.item.name}</p>
                <em>{'$' + listing.item.price}</em>
                <p>{'Cost of goods: $' + listing.item.cost_of_goods}</p>
                <p>{listing.item.sold ? 'Sold' : 'Unsold'}</p>
                <p>{'Condition: ' + listing.item.condition}</p>
                <p>{'Description: ' + listing.item.description}</p>
                {mappedListingSites}
            </div>
    )
}

export default Listing;