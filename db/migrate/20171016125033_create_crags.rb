class CreateCrags < ActiveRecord::Migration[5.1]
  def change
    create_table :crags do |t|
      t.string :name

      t.timestamps
    end
  end
end
