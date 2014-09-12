class RemoveReleaseDateFromBooks < ActiveRecord::Migration
  def change
    remove_column :books, :releaseDate, :string
  end
end
