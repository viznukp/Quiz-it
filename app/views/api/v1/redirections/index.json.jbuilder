json.redirections @redirections do |redirection|
  json.extract! redirection,
    :id,
    :source,
    :destination
end
