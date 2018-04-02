json.extract! @quote, :id, :text, :author
quotes = Quote.order(:id).pluck(:id)
current = quotes.index(@quote.id)
json.next_quote quotes[current + 1]
json.prev_quote quotes[current - 1] if current > 0
