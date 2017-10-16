class SectorsController < ApplicationController
  before_action :set_sector, only: [:show, :edit, :update]

  def create
    sector = Sector.create(sector_params)
    redirect_to crag_sector_path(sector)
  end

  def show
  end

  def edit
    @crag = Crag.find(params[:crag_id])
  end

  def update
    @sector.update(sector_params)
    redirect_to crag_sector_path(@sector)
  end

  private

  def sector_params
    params.require(:sector).permit(:name, :crag_id, :image)
  end

  def set_sector
    @sector = Sector.find(params[:id])
  end

end
