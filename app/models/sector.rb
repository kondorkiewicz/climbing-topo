class Sector < ApplicationRecord
  belongs_to :crag
  has_many :routes
  mount_uploader :image, ImageUploader

  def update_routes_numbers
    # sort routes by its start x coordinate to update position on sector
    rts = routes.sort_by { |route| JSON.parse(route.coords)[0]['x'] }
    rts.each.with_index(1) { |route, index| route.update_attribute(:number, index) }
  end
end
