class Sector < ApplicationRecord
  belongs_to :crag
  mount_uploader :image, ImageUploader
end
