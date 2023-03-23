class Site < ApplicationRecord
    has_many :listing_sites
    has_many :user_sites, dependent: :destroy
end
