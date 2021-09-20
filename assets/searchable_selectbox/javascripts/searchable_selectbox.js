// Replace with tom-select when the HTTP status of ajax request is a success.
// (by pure jquery)
$(document).ajaxSuccess(function() {
  replaceTomSelect();
  initAssignToMeLink();
});

// Replace with tom-select when the HTTP status of data-remote request is a success.
// (by rails-ujs)
$(document).on('ajax:success', function() {
  replaceTomSelect();
  initAssignToMeLink();
});

$(function() {
  // Replace with tom-select when loading page.
  replaceTomSelect();

  initAssignToMeLink();

  // Supports change of select box by filter function
  if ($('#query_form_with_buttons').length || $('form#query-form').length || $('form#query_form').length) {
    var oldAddFilter = window.addFilter;
    window.addFilter = function(field, operator, values){
      oldAddFilter(field, operator, values);
      $('#filters-table select:not([multiple]):not([data-remote])').each((_i, el) => {
        if (!el.tomselect) {
          new TomSelect(el);
        }
      });
      // $('#select2-add_filter_select-container.select2-selection__rendered').text('');
    }

    var oldToggleMultiSelect = window.toggleMultiSelect;
    window.toggleMultiSelect = function(el){
      oldToggleMultiSelect(el);
      if (el.attr('multiple')) {
        if (el.tomselect) {
          el.tomselect.destroy();
        }
      } else {
        if (!el.tomselect) {
          new TomSelect(el);
        }
      }
    }
  }
});

function replaceTomSelect() {
  // TODO: Need to support replace of select according to the click event.
  // Do not replace it with tom-select until it corresponds.
  if ($('body').hasClass('controller-workflows')) {
    return;
  } else {
    var selectInTabular = $('.tabular .splitcontent select:not([multiple]):not([data-remote])');
    if (selectInTabular.length) {
      selectInTabular.each((_i, el) => {
        if (!el.tomselect) {
          new TomSelect(el);
        }
        // width: 'style'
      });
    }

    var other = $('select:not([multiple]):not([data-remote])');
    if (other.length) {
      other.each((_i, el) => {
        if (!el.tomselect) {
          new TomSelect(el);
        }
      });
    }

    var excludedSelect = $('table.list td>select');
    if (excludedSelect.length) {
      excludedSelect.each((_i, el) => {
        if (el.tomselect) {
          el.tomselect.destroy();
        }
      });
    }
  }
}

// Changed for a change event to occur when change a value in #issue_assigned_to_id.
// https://github.com/ishikawa999/redmine_searchable_selectbox/issues/6
function initAssignToMeLink() {
  $('form#issue-form .assign-to-me-link').click(function(event) {
    event.preventDefault();
    var element = $(event.target);
    $('#issue_assigned_to_id').val(element.data('id')).change();
    element.hide();
  });
}
