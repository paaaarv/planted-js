require 'pry'

class PlantsController < ApplicationController



    def new
        plant =Plant.new
    end

    def create
        plant= Plant.new(plant_params)
        binding.pry
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
    			params.require(:plant).permit(:name, :fertilize, :notes)
    		end
end
