class RoutesController < ApplicationController

  def create
    @route = Route.create(route_params)
    @sector = @route.sector
    respond_to do |format|
      format.html { redirect_to sector_path(@sector) }
      format.js
    end
  end

  def edit
    @route = Route.find(params[:id])
    respond_to do |format|
      format.js
    end
  end

  def update
    @route = Route.find(params[:id])
    @route.update(route_params)
  end

  def destroy
    @route = Route.find(params[:id])
    @sector = @route.sector
    if @route.destroy
      respond_to do |format|
        format.html { redirect_to @sector }
      end
    end
  end

  private

  def route_params
    params.require(:route).permit(:name, :grade, :coords, :sector_id)
  end

end
