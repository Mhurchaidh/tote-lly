class CategoriesController < ApplicationController
    def index
        render json: @current_user.categories.uniq, status: :ok
    end
end
