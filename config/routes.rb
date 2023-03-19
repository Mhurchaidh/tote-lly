Rails.application.routes.draw do
  resources :sold_items
  resources :listing_categories
  resources :store_listings
  resources :listing_sites
  resources :listings
  resources :categories
  resources :stores
  resources :sites
  resources :items
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
