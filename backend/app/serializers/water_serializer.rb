class WaterSerializer
  include FastJsonapi::ObjectSerializer
  attributes :frequency
  has_many :plants
end
