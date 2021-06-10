require 'sort'

class Water < ApplicationRecord
  has_many :plants
  include Sort

  def self.arrange
      Sort.sorting(self.all)
  end
end
