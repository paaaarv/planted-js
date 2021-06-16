require 'pry'

class PlantsController < ApplicationController



    def new
        plant =Plant.new
    end

    def create
        binding.pry
        plant= Plant.new(plant_params)
        plant.save

    end

    def edit
       plant = Plant.find(params[:id])
     end

    def index
        plants= Plant.all
        options = {include:[:light, :water]
        }
        render json: PlantSerializer.new(plants,options)
    end

    def show
        plant=Plant.find(params[:id])
        render json: PlantSerializer.new(plant)
    end

    private

    		def plant_params
    			params.require(:plant).permit(:name, :fertilize, :light, :water, :notes)
    		end
end
