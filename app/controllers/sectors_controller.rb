class SectorsController < ApplicationController

  def create
    Sector.create(sector_params)
  end

  def show
    @sector = Sector.find(params[:id])
  end

  private

  def sector_params
    params.require(:sector).permit(:name, :crag_id)
  end

end
