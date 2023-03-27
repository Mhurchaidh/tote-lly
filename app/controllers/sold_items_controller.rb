class SoldItemsController < ApplicationController

    def index
        render json: @current_user.sold_items
    end

    def create
        sold_item = SoldItem.create!(sold_item_params)
        sold_item.listing.item.update(sold: true)
        render json: sold_item, status: :created
    end

    def destroy
        set_sold_item.listing.item.update(sold: false)
        set_sold_item.destroy
        head :no_content
    end

    private

    def set_sold_item
        SoldItem.find(params[:id])
    end

    def sold_item_params
        params.permit(:listing_id, :state, :sell_price, :shipping_cost, :customer_name, :date_sold, :store_sold, :site_sold, :quantity_sold)
    end
end
