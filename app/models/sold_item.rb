class SoldItem < ApplicationRecord
  belongs_to :listing
  has_one :user, through: :listing
  has_one :item, through: :listing
  has_many :categories, through: :listing
end
