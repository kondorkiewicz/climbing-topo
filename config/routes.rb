Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :crags do
    resources :sectors do
      resources :routes
    end
  end
  resources :sectors, only: [:show]
  resources :routes, only: [:create, :edit, :update, :destroy]
end
