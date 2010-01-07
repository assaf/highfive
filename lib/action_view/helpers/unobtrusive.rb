module ActionView
  module Helpers
    module Unobtrusive
      def link_to_remote(name, options = {}, html = nil)
        if options.respond_to?(:to_str)
          url = options.to_str
          options = {}
        else
          url = options.delete(:url)
        end
        html = options.delete(:html) || html || {}
        update = options.delete(:update)
        if update.is_a?(Hash)
          html["data-update-success"] = update[:success]
          html["data-update-failure"] = update[:failure]
        else
          html["data-update-success"] = update
        end

        html["data-update-position"] = options.delete(:position)
        html["data-method"]          = options.delete(:method)
        html["data-confirm"]         = options.delete(:confirm)
        html["data-remote"]          = "true"
        
        link_to(name, url, html)
      end

      def form_remote_tag(options = {}, &block)
        if options.respond_to?(:to_str)
          url = options.to_str
          options = {}
        else
          url = options.delete(:url)
        end
        html = options.delete(:html) || {}
        update = options.delete(:update)
        if update.is_a?(Hash)
          html["data-update-success"] = update[:success]
          html["data-update-failure"] = update[:failure]
        else
          html["data-update-success"] = update
        end
        html["data-confirm"]         = options.delete(:confirm)
        html["data-remote"]          = "true"
        html["onsubmit"] = "$(this).trigger('remote');return false"
        html.merge!(options)

        form_tag(html.delete(:action) || url_for(url), html, &block)
      end
    end
  end
end
