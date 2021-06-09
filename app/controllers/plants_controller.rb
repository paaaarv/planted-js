class PlantsController < ApplicationController



    def new
    end

    def index
        plants= Plant.all 
    end

end
