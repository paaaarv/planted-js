require 'pry'
module Sort
    def self.sorting(n)
        intensity = n.sort_by{|x| [x.frequency, x.plants.name]}
        return intensity
    end
end
