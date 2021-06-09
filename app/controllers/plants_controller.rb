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
        binding.pry
        plants= Plant.all
    end


    private

    		def plant_params
    			params.require(:plant).permit(:name, :fertilize, :notes)
    		end
end
