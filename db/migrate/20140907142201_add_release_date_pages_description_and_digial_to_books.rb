class AddReleaseDatePagesDescriptionAndDigialToBooks < ActiveRecord::Migration
  def change
    add_column :books, :releaseDate, :string
    add_column :books, :pages, :integer
    add_column :books, :description, :string
    add_column :books, :digital, :boolean
  end
end
