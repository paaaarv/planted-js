

class PlantsController < ApplicationController



    def new
        plant =Plant.new
    end

    def create
        plant= Plant.new(plant_params)
        plant.save

    end

    def edit
       plant = Plant.find(params[:id])
     end
     
    def index
        plants= Plant.all
    end

end
