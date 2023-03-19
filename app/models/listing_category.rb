class ListingCategory < ApplicationRecord
  belongs_to :listing_id
  belongs_to :category_id
end
