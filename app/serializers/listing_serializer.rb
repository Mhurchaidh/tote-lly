class ListingSerializer < ActiveModel::Serializer
  attributes :id, :item, :categories, :sites, :stores
end
