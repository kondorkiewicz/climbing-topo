class Route < ApplicationRecord
  belongs_to :sector

  validates_presence_of :name, :grade
  
end
