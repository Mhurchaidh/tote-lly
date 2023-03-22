class CreateUserSites < ActiveRecord::Migration[7.0]
  def change
    create_table :user_sites do |t|
      t.belongs_to :user
      t.belongs_to :site
      t.timestamps
    end
  end
end
