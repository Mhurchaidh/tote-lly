class CreateSoldItems < ActiveRecord::Migration[7.0]
  def change
    create_table :sold_items do |t|
      t.belongs_to :listing
      t.string :state
      t.float :sell_price
      t.float :shipping_cost
      t.string :customer_name
      t.datetime :date_sold
      t.string :store_sold
      t.string :site_sold
      t.text :customer_review
      t.boolean :refunded
      t.integer :quantity_sold

      t.timestamps
    end
  end
end
