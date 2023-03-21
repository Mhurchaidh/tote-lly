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
  
  post "/signup", to: "users#create"

  delete "/delete-users", to: "users#destroy"

  get "/me", to: "users#show"

  post "/login", to: "sessions#create"

  delete "logout", to: "sessions#destroy"
end
