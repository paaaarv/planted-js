Rails.application.routes.draw do

  resources :plants
  resources :light, only: [:index]
  resources :water, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
