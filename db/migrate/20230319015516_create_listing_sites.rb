class CreateListingSites < ActiveRecord::Migration[7.0]
  def change
    create_table :listing_sites do |t|
      t.belongs_to :listing
      t.belongs_to :site

      t.timestamps
    end
  end
end
