require "bundler/setup"
require "jekyll-assets"

Bundler.require(:default, "development")

if defined?(RailsAssets)
  RailsAssets.load_paths.each do |path|
    Sprockets.append_path path
  end
end
