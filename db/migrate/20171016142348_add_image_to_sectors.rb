class AddImageToSectors < ActiveRecord::Migration[5.1]
  def change
    add_column :sectors, :image, :string
  end
end
