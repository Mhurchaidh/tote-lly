class SitesController < ApplicationController
    def index 
        render json: @current_user.sites.uniq, status: :ok
    end
end
