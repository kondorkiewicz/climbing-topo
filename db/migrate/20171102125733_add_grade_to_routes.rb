class AddGradeToRoutes < ActiveRecord::Migration[5.1]
  def change
    add_column :routes, :grade, :string
  end
end
