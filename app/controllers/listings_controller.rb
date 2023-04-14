class ListingsController < ApplicationController
    def index
        render json: @current_user.listings, status: :ok
    end

    def destroy
        set_listing.destroy
        head :no_content
    end

    def create
        item = Item.create!(
            name: params[:name],
            order_number: params[:order_number],
            storage_location: params[:storage_location],
            price: params[:price],
            description: params[:description],
            condition: params[:condition],
            sold: false,
            cost_of_goods: params[:cost_of_goods],
            quantity: params[:quantity],
            date_listed: params[:date_listed]
        )
        listing = Listing.create!(item: item, user: @current_user)
        ListingSite.create!(listing: listing, site: Site.find_by(name: params[:site]))
        ListingCategory.create!(listing: listing, category: Category.find_by(name: params[:category]))
        render json: listing, status: :created
    end

    def update
        listing = set_listing
        listing.item.update(item_params)
        render json: listing, status: :accepted
    end

    private 

    def item_params
        params.permit(:name, :order_number, :price, :description, :condition, :sold, :cost_of_goods, :quantity, :date_listed)
    end

    def set_listing
        Listing.find(params[:id])
    end
end
