class AddDefaultToRoutesCoords < ActiveRecord::Migration[5.1]
  def change
    change_column_default :routes, :coords, "[]"
  end
end
