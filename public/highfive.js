(function($) {
  // Chrome likes to send the request as XML, which fails when there's no body
  // (e.g. links that post).
  var setContentType = function(xhr) { xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") }

  // Spooky action at a distance (link_to_remote).
  $("a[data-remote]").live("remote", function() {
    var link = $(this),
        method = (link.attr("data-method") || "get").toLowerCase(),
        question = link.attr("data-confirm"),
        success = link.attr("data-success"),
        error = link.attr("data-failure"),
        options = { beforeSend: setContentType };
    if (!question || confirm(question)) {
      options.url = link.attr("href"); 
      if (method == "get" || method == "post")
        options.type = method
      else {
        options.type = "post"
        options.data = { _method: method }
      }
      options.element = link;
      options.success = success ?
        function(response)              { $("#" + success).html(response) } :
        function(response, status, xhr) {
          try {
            eval(response)
            link.trigger("success", [response, status, xhr])
          } catch(ex) { console.log(ex) }
        }
      options.error = error ?
        function(xhr, status, ex) { $("#" + error).html(xhr.responseText) } :
        function(xhr, status, ex) { link.trigger("failure", [xhr, status, ex]) }
      $.ajax(options);
    }
    return false
  }).live("click", function() { $(this).trigger("remote"); return false });

  // Spooky action at a distance (form_remote_tag).
  $("form[data-remote]").live("remote", function() {
    var form = $(this),
        method = (form.attr("data-method") || "post").toLowerCase(),
        question = form.attr("data-confirm"),
        success = form.attr("data-success"),
        error = form.attr("data-failure"),
        buttons = form.find(":submit:enabled,button:enabled"),
        options = { beforeSend: setContentType };
    if (!question || confirm(question)) {
      options.url = form.attr("action"); 
      options.data = form.serialize();
      if (method == "get" || method == "post")
        options.type = method
      else {
        options.type = "post"
        options.data = options.data + "&_method=" + method
      }
      options.element = form;
      options.success = success ?
        function(response)              { $("#" + success).html(response) } :
        function(response, status, xhr) {
          try {
            eval(response)
            form.trigger("success", [response, status, xhr])
          } catch(ex) { console.log(ex) }
        }
      options.error = error ?
        function(xhr, status, ex) { $("#" + error).html(xhr.responseText) } :
        function(xhr, status, ex) { form.trigger("failure", [xhr, status, ex]) }
      buttons.attr("disabled", "disabled");
      options.complete = function() { buttons.attr("disabled", null) }
      $.ajax(options);
    }
    return false
  })
}(jQuery))
