puts "Generating Items and Listings..."
Item.create(
    name: 'Vase',
    price: 25.00,
    description: "It's a vase...",
    condition: "Pretty good",
    sold: false,
    cost_of_goods: 5.00,
    quantity: 1
)

Listing.create(
    user_id: User.find(1).id,
    item_id: Item.find(1).id
)

Item.create(
    name: 'Vase',
    price: 25.00,
    description: "It's a vase...",
    condition: "Pretty good",
    sold: false,
    cost_of_goods: 5.00,
    quantity: 1
)

Listing.create(
    user_id: User.find(1).id,
    item_id: Item.find(2).id
)

Item.create(
    name: 'Vase',
    price: 25.00,
    description: "It's a vase...",
    condition: "Pretty good",
    sold: false,
    cost_of_goods: 5.00,
    quantity: 1
)

Listing.create(
    user_id: User.find(1).id,
    item_id: Item.find(3).id
)

Item.create(
    name: 'Vase',
    price: 25.00,
    description: "It's a vase...",
    condition: "Pretty good",
    sold: false,
    cost_of_goods: 5.00,
    quantity: 1
)

Listing.create(
    user_id: User.find(1).id,
    item_id: Item.find(4).id
)

Item.create(
    name: 'Vase',
    price: 25.00,
    description: "It's a vase...",
    condition: "Pretty good",
    sold: false,
    cost_of_goods: 5.00,
    quantity: 1
)

Listing.create(
    user_id: User.find(1).id,
    item_id: Item.find(5).id
)

Item.create(
    name: 'Vase',
    price: 25.00,
    description: "It's a vase...",
    condition: "Pretty good",
    sold: false,
    cost_of_goods: 5.00,
    quantity: 1
)

Listing.create(
    user_id: User.find(1).id,
    item_id: Item.find(6).id
)

puts "Generating Sites..."
Site.create(
    name: 'Ebay',
    site_address: 'pretend this is a site address... :)'
)

Site.create(
    name: 'Mercari',
    site_address: 'pretend this is a site address... :)'
)

Site.create(
    name: 'Facebook Marketplace',
    site_address: 'pretend this is a site address... :)'
)

puts "Generating Stores..."
Store.create(
    name: '12 West Treasures'
)

Store.create(
    name: 'Desert Sky Mercantile'
)

puts "Generating Categories..."
Category.create(
    name: 'Shoes'
)

Category.create(
    name: 'Clothing'
)

Category.create(
    name: 'Books'
)

Category.create(
    name: 'Jewelry'
)

Category.create(
    name: 'Antique'
)

Category.create(
    name: 'Electronics'
)

Category.create(
    name: 'Artwork'
)

puts "Done Seeding!"