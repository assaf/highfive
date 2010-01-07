(function($) {
  $.error = function(exception) { console.log(exception) }

  // Spooky action at a distance (link_to_remote).
  $("a[data-remote]").live("remote", function() {
    var link = $(this);
    var question = link.attr("data-confirm");
    if (question && !confirm(question)) return false;
    options = {};
    options.type = link.attr("data-method");
    options.url = link.attr("href"); 
    options.element = link;
    var success = link.attr("data-success");
    if (success) options.success = function(response) { $("#" + success).html(response) }
    else options.success = function(response) { try { eval(response) } catch(ex) { $.error(ex) } }
    var error = link.attr("data-failure");
    if (error) options.error = function(response) { $("#" + error).html(response) };
    $.ajax(options);
  }).live("click", function() { $(this).trigger("remote"); return false });

  // Spooky action at a distance (form_remote_tag).
  $("form[data-remote]").live("remote", function() {
    var form = $(this);
    var question = form.attr("data-confirm");
    if (question && !confirm(question)) return false;
    options = {};
    options.type = form.attr("method");
    options.url = form.attr("action"); 
    options.data = form.serialize();
    options.element = form;
    var success = form.attr("data-success");
    if (success) options.success = function(response) { $("#" + success).html(response) }
    else options.success = function(response) { try { eval(response) } catch(ex) { $.error(ex) } }
    var error = form.attr("data-failure");
    if (error) options.error = function(response) { $("#" + error).html(response) };
    var buttons = form.find(":submit:enabled,button:enabled").attr("disabled", "disabled");
    options.complete = function(status) { buttons.attr("disabled", null) }
    $.ajax(options);
  })
}(jQuery))
