class ListingsController < ApplicationController
    def index
        render json: @current_user.listings, status: :ok
    end

    def destroy
        set_listing.destroy
        head :no_content
    end

    def create
        item = Item.create!(item_params)
        listing = Listing.create!(item: item, user: @current_user)
        ListingSite.create!(listing: listing, site: Site.first)
        render json: listing, status: :created
    end

    def update
        listing = set_listing
        listing.item.update(item_params)
        render json: listing, status: :accepted
    end

    private 

    def item_params
        params.permit(:name, :price, :description, :condition, :sold, :cost_of_goods, :quantity, :date_listed)
    end

    def set_listing
        Listing.find(params[:id])
    end
end
