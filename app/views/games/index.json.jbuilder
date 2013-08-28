json.array!(@games) do |game|
  json.extract! game, :title, :system, :beat
  json.url game_url(game, format: :json)
end
