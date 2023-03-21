class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :condition, :sold, :cost_of_goods, :quantity, :date_listed
end
