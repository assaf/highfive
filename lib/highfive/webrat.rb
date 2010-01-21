module Webrat
  class Link < Element #:nodoc:
    def http_method
      @element["data-method"] || :get
    end
  end
end
