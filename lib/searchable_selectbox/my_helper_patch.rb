# frozen_string_literal: true

require_dependency 'my_helper'

module SearchableSelectbox
  module MyHelperPatch
    def self.included(base)
      base.send(:prepend, InstanceMethods)
    end

    module InstanceMethods
      # Run replaceTomSelect(); when remove_block.js.erb
      def block_select_tag(user)
        super(user) +
        javascript_tag do
          '$(function(){replaceTomSelect();});'
        end
      end
    end
  end
end
