class SitesController < ApplicationController
    def index 
        render json: @current_user.sites.uniq, status: :ok
    end

    def create
        site = Site.create!(site_params)
        UserSite.create!(user: @current_user, site: site)
        render json: site, status: :created
    end

    def update
        site = set_site
        site.update(site_params)
        render json: site, status: :accepted
    end

    def destroy
        set_site.destroy
        head :no_content
    end

    private

    def set_site
        Site.find(params[:id])
    end

    def site_params
        params.permit(:name, :site_address)
    end
end
