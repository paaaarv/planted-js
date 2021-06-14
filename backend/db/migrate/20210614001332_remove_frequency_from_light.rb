class RemoveFrequencyFromLight < ActiveRecord::Migration[5.2]
  def change
    remove_column :lights, :frequency, :integer
  end
end
