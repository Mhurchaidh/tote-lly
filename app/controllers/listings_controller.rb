class ListingsController < ApplicationController
    def index
        render json: @current_user.listings, status: :ok
    end
end
