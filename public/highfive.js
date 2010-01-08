(function($) {
  // Spooky action at a distance (link_to_remote).
  $("a[data-remote]").live("remote", function() {
    var link = $(this),
        method = (link.attr("data-method") || "get").toLowerCase(),
        question = link.attr("data-confirm"),
        success = link.attr("data-success"),
        error = link.attr("data-failure"),
        options = {};
    if (question && !confirm(question)) return false;
    options.url = link.attr("href"); 
    if (method == "get" || method == "post") { options.type = method }
    else { options.type = "post" ; options.data = { _method: method } }
    options.element = link;
    if (success) options.success = function(response) { $("#" + success).html(response) }
    else options.success = function(response) { try { eval(response) } catch(ex) { console.log(ex) } }
    if (error) options.error = function(response) { $("#" + error).html(response) };
    $.ajax(options);
  }).live("click", function() { $(this).trigger("remote"); return false });

  // Spooky action at a distance (form_remote_tag).
  $("form[data-remote]").live("remote", function() {
  try {
    var form = $(this),
        method = (form.attr("data-method") || "post").toLowerCase(),
        question = form.attr("data-confirm"),
        success = form.attr("data-success"),
        error = form.attr("data-failure"),
        buttons = form.find(":submit:enabled,button:enabled"),
        options = {};
    if (question && !confirm(question)) return false;
    options.url = form.attr("action"); 
    options.data = form.serialize();
    if (method == "get" || method == "post") { options.type = method }
    else { options.type = "post" ; options.data = options.data + "&_method=" + method }
    options.element = form;
    if (success) options.success = function(response) { $("#" + success).html(response) }
    else options.success = function(response) { try { eval(response) } catch(ex) { console.log(ex) } }
    if (error) options.error = function(response) { $("#" + error).html(response) };
    buttons.attr("disabled", "disabled");
    options.complete = function(status) { buttons.attr("disabled", null) }
    $.ajax(options);
    } catch (ex) { alert(ex) }
  })
}(jQuery))
