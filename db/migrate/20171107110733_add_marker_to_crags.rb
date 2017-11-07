class AddMarkerToCrags < ActiveRecord::Migration[5.1]
  def change
    add_column :crags, :marker, :string
  end
end
