class LightSerializer
  include FastJsonapi::ObjectSerializer
  attributes :intensity
  has_many :plants
end
