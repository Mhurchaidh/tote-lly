class CreateUserStores < ActiveRecord::Migration[7.0]
  def change
    create_table :user_stores do |t|
      t.belongs_to :user
      t.belongs_to :store
      t.timestamps
    end
  end
end
