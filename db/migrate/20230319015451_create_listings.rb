class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.belongs_to :item
      t.belongs_to :user

      t.timestamps
    end
  end
end
