json.array!(@books) do |book|
  json.extract! book, :title, :author, :read
  json.url book_url(book, format: :json)
end
