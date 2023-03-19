class CreateStoreListings < ActiveRecord::Migration[7.0]
  def change
    create_table :store_listings do |t|
      t.belongs_to :store
      t.belongs_to :listing

      t.timestamps
    end
  end
end
