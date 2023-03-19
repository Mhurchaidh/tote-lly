class Listing < ApplicationRecord
  belongs_to :item_id
  belongs_to :user_id
  has_many :sold_items
  has_many :listing_sites
  has_many :store_listings
  has_many :listing_categories
end
