$("#busy").hide();
$("#redirecting").hide();
$(document).ready(function(){
  $("#registerForm").submit((e) => {
    e.preventDefault();
    $("#busy").slideDown();
    console.log("starting sending")
    $.ajax("/api/register", {
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        username: $("#registerForm").find("input[name=username]").val(),
        password: $("#registerForm").find("input[name=password]").val()
      }),
      url: '/api/register',
      method: 'post',
      success: (data, status, xhr) => {
        console.log(data);
        if (data.err) {
          $("#busy").slideUp();
          setTimeout(() => {
            $("#alerts").append(`
              <div id="error" style="display: none;" class="alert alert-warning">
                ${data.errObj.msg}
              </div>
            `);
            $("#error").slideDown();
          }, 200);
        } else {
          $("#busy").slideUp();
          setTimeout(() => {
            $("#redirecting").slideDown();
            setTimeout(() => {
              $.redirect("./api/login-reg", { username: $("#registerForm").find("input[name=username]").val(), password: $("#registerForm").find("input[name=password]").val() }, "POST")
            }, 2000);
          }, 400);
        }
      }
    });
  });

  $("#login-nav").submit((e) => {
    e.preventDefault();
    $("#nav-alerts").empty();
    $("#nav-alerts").append(`
      <div id="nav-busy" style="display: none;" class="alert alert-success">
        Bezig met inloggen...
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    `);
    $("#nav-busy").slideDown();
    $.ajax("/api/login", {
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        username: $(this).find("input[name=username]").val(),
        password: $(this).find("input[name=password]").val()
      }),
      url: '/api/login',
      method: 'post',
      success: (data) => {
        $("#nav-alerts").empty();
        $("#nav-alerts").append(`
            <div id="nav-done" class="alert alert-success" style="display: none;">
              ${data.msg}
            </div>
        `);
        $("#nav-done").slideDown();
        setTimeout(() => {
          window.location = "/home";
        }, 2000);
      },
      error: (data, status, thrown) => {
        console.log(data);
        console.log(status);
        console.log(thrown);
          $("#nav-alerts").empty();
          $("#nav-alerts").append(`
            <div id="nav-done" class="alert alert-danger" style="display: none;">
              ${getTrans(thrown)}
            </div>
          `);
          $("#nav-done").slideDown();
      }
    });
  });

  var getTrans = (og) => {
    if (og == "Unauthorized") {
      return "De combinatie gebruikersnaam en wachtwoord is incorrect.";
    }
  }
});
