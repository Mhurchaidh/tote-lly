class CreateUserCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :user_categories do |t|
      t.belongs_to :user
      t.belongs_to :category
      t.timestamps
    end
  end
end
