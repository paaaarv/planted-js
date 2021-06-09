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


light_a= Light.create(frequency: 1)
light_b=Light.create(frequency:2)
light_c=Light.create(frequency:3)

water_a=Water.create(frequency:7)
water_b=Water.create(frequency:14)
water_c=Water.create(frequency:30)
