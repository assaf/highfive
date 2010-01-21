(function($) {
  // Confirmation before processing link.
  $("a[data-confirm]").live("click", function() { return confirm($(this).attr("data-confirm")) });
  // Popup a new page.
  $("a[data-popup]").live("click", function() { window.open($(this).attr("href"), $(this).attr("data-popup")) ; return false });
  // Spooky action at a distance (link_to_remote).
  $("a[data-remote]").live("click", function() {
    var link = $(this),
        method = (link.attr("data-method") || "get").toLowerCase(),
        success = link.attr("data-success"),
        error = link.attr("data-failure");
        options = { contentType: "application/x-www-form-urlencoded" };
    options.url = link.attr("href"); 
    if (method == "get" || method == "post")
      options.type = method
    else {
      options.type = "post"
      options.data = { _method: method }
    }
    options.element = link;
    options.dataType = success ? "html" : "script";
    options.success = success ?
      function(response)              { $(document.getElementById(success)).html(response) } :
      function(response, status, xhr) { link.trigger("success", [response, status, xhr]) }
    options.error = error ?
      function(xhr, status, ex) { $(document.getElementById(error)).html(xhr.responseText) } :
      function(xhr, status, ex) { link.trigger("failure", [xhr, status, ex]) }
    $.ajax(options);
    return false
  });
  // Links that use forms for various methods (e.g. signup: delete)
  $("a[data-method]").live("click", function() {
    var link = $(this), method = link.attr("data-method") || "get",
        form = $("<form>", { style: "display:none", method: method == "get" ? "get" : "post", action: link.attr("href") });
    if (method != "get") {
      form.append($("<input>", { type: "hidden", name: "authenticity_token", value: window.AUTH_TOKEN }));
      if (method != "post") form.append($("<input>", { type: "hidden", name: "_method", value: method }));
    }
    $(document.body).append(form);
    form.submit();
    return false
  });

  // Confirmation before submitting form.
  $("form[data-confirm]").live("submit", function() { return confirm($(this).attr("data-confirm")) });
  // Spooky action at a distance (form_remote_tag).
  $("form[data-remote]").live("submit", function() {
    var form = $(this),
        method = (form.attr("data-method") || "post").toLowerCase(),
        success = form.attr("data-success"),
        error = form.attr("data-failure"),
        buttons = form.find(":submit:enabled,button:enabled"),
        options = { contentType: "application/x-www-form-urlencoded" };
    options.url = form.attr("action"); 
    options.data = form.serialize();
    if (method == "get" || method == "post")
      options.type = method
    else {
      options.type = "post"
      options.data = options.data + "&_method=" + method
    }
    options.element = form;
    options.dataType = success ? "html" : "script";
    options.success = success ?
      function(response)              { $(document.getElementById(success)).html(response) } :
      function(response, status, xhr) { form.trigger("success", [response, status, xhr]) }
    options.error = error ?
      function(xhr, status, ex) { $(document.getElementById(error)).html(xhr.responseText) } :
      function(xhr, status, ex) { form.trigger("failure", [xhr, status, ex]) }
    buttons.attr("disabled", "disabled");
    options.complete = function() { buttons.attr("disabled", null) }
    $.ajax(options);
    return false
  }).live("submit", function() { $(this).trigger("remote"); return false });

}(jQuery))
