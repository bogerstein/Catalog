json.array!(@movies) do |movie|
  json.extract! movie, :title, :watched
  json.url movie_url(movie, format: :json)
end
