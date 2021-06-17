# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


plant_a =Plant.create(name: "Monstera", fertilize: 30, notes: "she's iffy", water_id:1, light_id:1)
plant_b=Plant.create(name: "English Ivy", fertilize: 30, notes: "don't mess with her too much she doesn't like it",water_id:1, light_id:3)
plant_c= Plant.create(name: "Snake Plant", fertilize: 30, notes: "super easy low maintenance",water_id:2, light_id:1 )


light_a= Light.create(intensity: 'full sun')
light_b=Light.create(intensity:'indirect')
light_c=Light.create(intensity: 'low light')




for i in 1..30 do
        Water.create(frequency:i)

end
