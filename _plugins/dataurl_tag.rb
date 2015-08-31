require "base64"
require "mimemagic"

module Jekyll
  class DataUrlTag < Liquid::Tag
    def initialize(tag_name, filePath, tokens)
      super

      filePath.strip!
      unless File.file? filePath
        puts Dir.pwd
        raise "Could not load file: #{filePath}"
      end

      @file = File.open filePath
    end

    def render(context)
      file = @file.read
      "data:#{MimeMagic.by_magic file};base64,#{Base64.strict_encode64 file}"
    end
  end
end

Liquid::Template.register_tag 'data_url', Jekyll::DataUrlTag
