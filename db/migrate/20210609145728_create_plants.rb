class CreatePlants < ActiveRecord::Migration[5.2]
  def change
    create_table :plants do |t|
        t.string :name
        t.integer :fertilize
        t.text :notes
        t.references :light, foreign_key: true
        t.references :water, foreign_key: true
      t.timestamps
    end
  end
end
