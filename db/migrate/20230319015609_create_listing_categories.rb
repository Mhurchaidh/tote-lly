class CreateListingCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :listing_categories do |t|
      t.belongs_to :listing
      t.belongs_to :category

      t.timestamps
    end
  end
end
