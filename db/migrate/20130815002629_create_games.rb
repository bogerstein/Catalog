class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title
      t.string :system
      t.boolean :beat

      t.timestamps
    end
  end
end
