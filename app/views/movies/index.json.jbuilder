json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :sd, :hd, :threed, :digital, :watched
  json.url movie_url(movie, format: :json)
end
