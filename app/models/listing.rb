class Listing < ApplicationRecord
  belongs_to :item
  belongs_to :user
  has_many :sold_items
  has_many :listing_sites
  has_many :store_listings
  has_many :listing_categories
end
