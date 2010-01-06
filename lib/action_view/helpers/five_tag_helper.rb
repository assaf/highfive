module ActionView
  module Helpers
    module FiveTagHelper
      %w(email url number range search color date month week time datetime datetime_local).each do |type|
        class_eval <<-EOS, __FILE__, __LINE__
          def #{type}_field(object_name, method, options = {})
            InstanceTag.new(object_name, method, self, options.delete(:object)).to_input_field_tag("#{type.gsub(/_/, '-')}", options)
          end
          def #{type}_field_tag(name, value = nil, options = {})
            text_field_tag(name, value, options.stringify_keys.update("type" => "#{type.gsub(/_/, '-')}"))
          end
        EOS
      end

      def self.included(base)
        %w(email url number range search color date month week time datetime datetime_local).each do |type|
          FormBuilder.class_eval <<-EOS, __FILE__, __LINE__
            def #{type}_field(method, options = {}) # def email_field(method, options = {})
              @template.send(                       #   @template.send(
                "#{type}_field",                      #     "email_field",
                @object_name,                       #     @object_name,
                method,                             #     method,
                objectify_options(options))         #     objectify_options(options))
            end                                     # end
          EOS
        end
      end
    end
  end
end
