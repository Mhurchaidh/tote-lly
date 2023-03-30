class SoldItemSerializer < ActiveModel::Serializer
  attributes :id, :listing, :item, :state, :sell_price, :shipping_cost, :customer_name, :date_sold, :store_sold, :site_sold, :quantity_sold, :categories
end
