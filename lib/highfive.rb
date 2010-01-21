require "action_view/helpers/five_tag_helper"
require "action_view/helpers/unobtrusive"

class ActionView::Base
  include FiveTagHelper
  include Unobtrusive
end

begin
  require "webrat"
rescue LoadError
else
  require "highfive/webrat"
end
