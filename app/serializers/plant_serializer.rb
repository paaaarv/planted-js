class PlantSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :fertilize, :notes
  belongs_to :light
  belongs_to :water 
end
