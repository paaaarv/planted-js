class PlantSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  belongs_to :light
  belongs_to :water
end
