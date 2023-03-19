class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.text :description
      t.text :condition
      t.boolean :sold
      t.float :cost_of_goods
      t.integer :quantity
      t.datetime :date_listed

      t.timestamps
    end
  end
end
