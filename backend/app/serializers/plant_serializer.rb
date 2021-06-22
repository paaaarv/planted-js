class PlantSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :fertilize
  belongs_to :light
  belongs_to :water
end
