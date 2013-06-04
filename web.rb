require 'sinatra'

get '/' do
  haml :index
end

get '/new' do
  haml :new
end

get '/old' do
  haml :old
end