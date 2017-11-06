class AddCoordsToRoutes < ActiveRecord::Migration[5.1]
  def change
    add_column :routes, :coords, :string
  end
end
