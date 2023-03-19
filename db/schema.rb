# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_19_015728) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.text "description"
    t.text "condition"
    t.boolean "sold"
    t.float "cost_of_goods"
    t.integer "quantity"
    t.datetime "date_listed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "listing_categories", force: :cascade do |t|
    t.bigint "listing_id"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_listing_categories_on_category_id"
    t.index ["listing_id"], name: "index_listing_categories_on_listing_id"
  end

  create_table "listing_sites", force: :cascade do |t|
    t.bigint "listing_id"
    t.bigint "site_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_listing_sites_on_listing_id"
    t.index ["site_id"], name: "index_listing_sites_on_site_id"
  end

  create_table "listings", force: :cascade do |t|
    t.bigint "item_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_listings_on_item_id"
    t.index ["user_id"], name: "index_listings_on_user_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "name"
    t.string "site_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sold_items", force: :cascade do |t|
    t.bigint "listing_id"
    t.string "state"
    t.float "sell_price"
    t.float "shipping_cost"
    t.string "customer_name"
    t.datetime "date_sold"
    t.string "store_sold"
    t.string "site_sold"
    t.text "customer_review"
    t.boolean "refunded"
    t.integer "quantity_sold"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_sold_items_on_listing_id"
  end

  create_table "store_listings", force: :cascade do |t|
    t.bigint "store_id"
    t.bigint "listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_store_listings_on_listing_id"
    t.index ["store_id"], name: "index_store_listings_on_store_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
