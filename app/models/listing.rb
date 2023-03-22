class Listing < ApplicationRecord
  belongs_to :item, dependent: :destroy
  belongs_to :user
  has_many :sold_items

  has_many :listing_sites
  has_many :sites, through: :listing_sites

  has_many :store_listings
  has_many :stores, through: :store_listings

  has_many :listing_categories
  has_many :categories, through: :listing_categories
end
