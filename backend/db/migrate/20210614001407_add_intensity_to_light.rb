class AddIntensityToLight < ActiveRecord::Migration[5.2]
  def change
    add_column :lights, :intensity, :string
  end
end
