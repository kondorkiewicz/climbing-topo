class Sector < ApplicationRecord
  belongs_to :crag
  has_many :routes
  mount_uploader :image, ImageUploader
end
