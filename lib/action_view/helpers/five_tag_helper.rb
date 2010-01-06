module ActionView
  module Helpers
    module FiveTagHelper
      # Input field with type email.
      def email_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "email"))
      end

      # Input field with type url.
      def url_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "url"))
      end

      # Input field with type number.
      def number_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "number"))
      end

      # Input field with type range.
      def range_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "range"))
      end

      # Input field with type search.
      def search_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "search"))
      end

      # Input field with type color.
      def color_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "color"))
      end

      # Input field with type date.
      def date_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "date"))
      end

      # Input field with type month.
      def month_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "month"))
      end

      # Input field with type week.
      def week_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "week"))
      end

      # Input field with type time.
      def time_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "time"))
      end

      # Input field with type datetime.
      def datetime_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "datetime"))
      end

      # Input field with type datetime-local.
      def datetime_local_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "datetime-local"))
      end
      
    end
  end
end
