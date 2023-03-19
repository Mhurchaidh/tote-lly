class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sites do |t|
      t.string :name
      t.string :site_address

      t.timestamps
    end
  end
end
