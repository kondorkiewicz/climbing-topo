class CragsController < ApplicationController

  def index
    @crags = Crag.all
    @crag = Crag.new
  end

  def create
    crag = Crag.create(crag_params)
    render js: "window.location = '#{crag_path(crag)}'"
  end

  def show
    @crag = Crag.find(params[:id])
    @sector = Sector.new
  end

  private

  def crag_params
    params.require(:crag).permit(:name, :marker)
  end

end
