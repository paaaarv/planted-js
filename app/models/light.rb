
require 'pry'
class Light < ApplicationRecord
  has_many :plants

  def self.sorted
      self.all.sort_by{|light| [light.frequency]}
  end

end
