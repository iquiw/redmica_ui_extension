# frozen_string_literal: true

module SearchableSelectbox
  class HookListener < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(context)
      return '' unless Setting.enabled_redmica_ui_extension_feature?('searchable_selectbox')

      stylesheet_link_tag('../searchable_selectbox/stylesheets/tom-select', plugin: 'redmica_ui_extension') +
      stylesheet_link_tag('../searchable_selectbox/stylesheets/searchable_selectbox', plugin: 'redmica_ui_extension') +
      javascript_include_tag('../searchable_selectbox/javascripts/tom-select.complete.min.js', plugin: 'redmica_ui_extension') +
      javascript_include_tag('../searchable_selectbox/javascripts/searchable_selectbox.js', plugin: 'redmica_ui_extension')
    end
  end
end
