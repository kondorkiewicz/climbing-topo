class RoutesController < ApplicationController
  before_action :set_route, only: [:edit, :update, :destroy]


  def create
    @route = Route.create(route_params)
    @sector = @route.sector
    respond_to do |format|
      format.html { redirect_to sector_path(@sector) }
      format.js
    end
  end

  def edit
    respond_to do |format|
      format.js
    end
  end

  def update
    @route.update(route_params)
    @route.sector.update_routes_numbers
    render js: "window.location = '#{sector_path(@route.sector)}'"
  end

  def destroy
    @sector = @route.sector
    if @route.destroy
      respond_to do |format|
        format.html { redirect_to @sector }
      end
    end
  end

  private

  def set_route
    @route = Route.find(params[:id])
  end

  def route_params
    params.require(:route).permit(:name, :grade, :coords, :sector_id)
  end

end
