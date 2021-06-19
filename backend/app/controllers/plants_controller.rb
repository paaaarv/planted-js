require 'pry'

class PlantsController < ApplicationController



    def new
        plant =Plant.new
    end

    def create

        plant= Plant.new(plant_params)
        plant.save

    end

    def index
        plants= Plant.all
        options = {include:[:light, :water]
        }
        render json: PlantSerializer.new(plants,options)
    end

    def destroy
        plant=Plant.find(params[:id])
        plant.destroy
    end

    private

    		def plant_params
    			params.require(:plant).permit(:name, :fertilize, :light_id, :water_id)
    		end
end
