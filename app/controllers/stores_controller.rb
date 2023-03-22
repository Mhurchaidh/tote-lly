class StoresController < ApplicationController
    def index
        render json: @current_user.stores.uniq, status: :ok
    end
end
