require 'sort'
require 'pry'
class Light < ApplicationRecord
  has_many :plants
  include Sort

  def self.arrange
      Sort.sorting(self.all)
  end
end
