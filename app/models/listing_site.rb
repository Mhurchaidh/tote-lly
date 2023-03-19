class ListingSite < ApplicationRecord
  belongs_to :listing_id
  belongs_to :site_id
end
