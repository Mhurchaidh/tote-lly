class StoreListing < ApplicationRecord
  belongs_to :store_id
  belongs_to :listing_id
end
