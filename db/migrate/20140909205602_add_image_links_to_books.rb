class AddImageLinksToBooks < ActiveRecord::Migration
  def change
    add_column :books, :big_image, :string
    add_column :books, :small_image, :string
  end
end
