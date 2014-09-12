# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140909205602) do

  create_table "books", force: true do |t|
    t.string   "title"
    t.string   "author"
    t.boolean  "read"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "link"
    t.integer  "pages"
    t.string   "description"
    t.boolean  "digital"
    t.string   "release_date"
    t.string   "big_image"
    t.string   "small_image"
  end

  create_table "movies", force: true do |t|
    t.string   "title"
    t.boolean  "sd"
    t.boolean  "hd"
    t.boolean  "threed"
    t.boolean  "digital"
    t.boolean  "watched"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "video_games", force: true do |t|
    t.string   "title"
    t.string   "system"
    t.boolean  "digital"
    t.boolean  "beat"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
