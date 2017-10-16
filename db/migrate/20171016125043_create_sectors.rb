class CreateSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :sectors do |t|
      t.string :name
      t.references :crag, foreign_key: true

      t.timestamps
    end
  end
end
