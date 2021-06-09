class CreateWaters < ActiveRecord::Migration[5.2]
  def change
    create_table :waters do |t|
      t.references :plant, foreign_key: true
      t.integer :frequency
      t.timestamps
    end
  end
end
