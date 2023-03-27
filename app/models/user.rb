class User < ApplicationRecord
    has_secure_password
    has_many :listings
    has_many :items, through: :listings
    has_many :sold_items, through: :listings

    has_many :user_categories
    has_many :categories, through: :user_categories

    has_many :user_sites
    has_many :sites, through: :user_sites
    
    has_many :user_stores
    has_many :stores, through: :user_stores
end
