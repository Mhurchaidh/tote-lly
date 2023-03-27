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

UserSite.create(
    user: User.find(1),
    site: Site.find(1)
)

UserSite.create(
    user: User.find(1),
    site: Site.find(2)
)

UserSite.create(
    user: User.find(1),
    site: Site.find(3)
)

puts "Generating Stores..."
Store.create(
    name: '12 West Treasures'
)

Store.create(
    name: 'Desert Sky Mercantile'
)

UserStore.create(
    user: User.find(1),
    store: Store.find(1)
)

UserStore.create(
    user: User.find(1),
    store: Store.find(2)
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

Category.create(
    name: 'Glass/Ceramic'
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(1)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(2)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(3)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(4)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(5)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(6)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(7)
)

UserCategory.create(
    user: User.find(1),
    category: Category.find(8)
)

puts "Generating Items and Listings..."
60.times do
    item = Item.create(
        name: Faker::Tea.variety,
        order_number: Faker::Barcode.upc_e,
        storage_location: Faker::House.room,
        price: Faker::Commerce.price(range: 25.00..150.00),
        description: Faker::Fantasy::Tolkien.poem,
        condition: ['Fair', 'Moderate', 'Good', 'Very Good', 'Like New', 'New'].sample,
        sold: false,
        cost_of_goods: Faker::Commerce.price(range: 1.00..15.00),
        quantity: 1
    )

    listing = Listing.create(
        user: User.find(1),
        item: item
    )

    3.times do
        ListingCategory.create(
            listing: listing,
            category: Category.all.sample
        )
    end

    ListingSite.create(
        listing: listing,
        site: Site.all.sample
    )
    # 2.times do
    # end

    StoreListing.create(
        listing: listing,
        store: Store.all.sample
    )
end

puts "Generating Listing Categories..."
# 50.times (
#     listing: Listing.all.sample,
#     category: Category.all.sample
# )

puts "Generating Listing Sites..."

# Item.create(
#     name: 'Vase',
#     price: 25.00,
#     description: "It's a vase...",
#     condition: "Pretty good",
#     sold: false,
#     cost_of_goods: 5.00,
#     quantity: 1
# )

# Listing.create(
#     user: User.find(1),
#     item: Item.find(1)
# )

# ListingCategory.create(
#     listing: Listing.find(1),
#     category: Category.find_by(name: 'Antique')
# )

# ListingCategory.create(
#     listing: Listing.find(1),
#     category: Category.find_by(name: 'Glass/Ceramic')
# )

# Item.create(
#     name: 'Michael Kors Coat',
#     price: 95.00,
#     description: "Beautiful blue overcoat...",
#     condition: "New",
#     sold: false,
#     cost_of_goods: 35.00,
#     quantity: 1
# )

# Listing.create(
#     user: User.find(1),
#     item: Item.find(2)
# )

# ListingCategory.create(
#     listing: Listing.find(2),
#     category: Category.find_by(name: "Clothing")
# )

# Item.create(
#     name: 'Amethyst Signet Ring',
#     price: 125.00,
#     description: "Sterling silver ring with amethyst gem",
#     condition: "Light tarnishing",
#     sold: false,
#     cost_of_goods: 15.00,
#     quantity: 1
# )

# Listing.create(
#     user: User.find(1),
#     item: Item.find(3)
# )

# ListingCategory.create(
#     listing: Listing.find(3),
#     category: Category.find_by(name: 'Jewelry')
# )

# ListingCategory.create(
#     listing: Listing.find(3),
#     category: Category.find_by(name: 'Antique')
# )

# Item.create(
#     name: 'Vase',
#     price: 25.00,
#     description: "It's a vase...",
#     condition: "Pretty good",
#     sold: false,
#     cost_of_goods: 5.00,
#     quantity: 1
# )

# Listing.create(
#     user_id: User.find(1).id,
#     item_id: Item.find(4).id
# )

# Item.create(
#     name: 'Vase',
#     price: 25.00,
#     description: "It's a vase...",
#     condition: "Pretty good",
#     sold: false,
#     cost_of_goods: 5.00,
#     quantity: 1
# )

# Listing.create(
#     user_id: User.find(1).id,
#     item_id: Item.find(5).id
# )

# Item.create(
#     name: 'Vase',
#     price: 25.00,
#     description: "It's a vase...",
#     condition: "Pretty good",
#     sold: false,
#     cost_of_goods: 5.00,
#     quantity: 1
# )

# Listing.create(
#     user_id: User.find(1).id,
#     item_id: Item.find(6).id
# )
puts "Done Seeding!"