$(document).ready(() => {
  $("#follow-btn").hover(function() {
    if ($(this).text() == "Gevolgd!") {
      $(this).attr('class', 'btn btn-lg btn-danger');
      $(this).text('Ontvolgen');
    }
  }).mouseout(function() {
    if ($(this).text() == "Ontvolgen") {
      $(this).attr('class', 'btn btn-lg btn-success').innerHTML = 'Gevolgd!';
      $(this).text('Gevolgd!');
    }
  });

  $("#follow-btn").click(function() {
    if ($(this).text() === "Volgen") {
      console.log($(this).data('username'));
      $.ajax('../api/follow', {
        contentType: 'application/json',
        dataType: 'json',
        url: '../api/follow',
        method: 'post',
        data: JSON.stringify({
          target: $(this).data('username')
        }),
        success: (data) => {
          console.log(data);
          if (data.err) {
            throw data.errObj
          }
          $(this).attr('class', 'btn btn-lg btn-success').text('Gevolgd!');
          location.reload();
        }
      });
    } else
    if ($(this).text() == "Ontvolgen") {
      $.ajax('../api/unfollow', {
        contentType: 'application/json',
        dataType: 'json',
        url: '../api/unfollow',
        method: 'post',
        data: JSON.stringify({
          target: $(this).data('username')
        }),
        success: (data) => {
          console.log(data);
          if (data.err) {
            throw data.errObj
          }
          $(this).attr('class', 'btn btn-lg btn-primary').text('Volgen');
          location.reload();
        }
      });
    }
  });

  $('.posts').masonry({
    itemSelector: '.post',
    columnWidth: 340
  });

  // $("#login-nav").submit((e) => {
  //   e.preventDefault();
  //   $("#nav-alerts").empty();
  //   $("#nav-alerts").append(`
  //     <div id="nav-busy" style="display: none;" class="alert alert-success">
  //       Bezig met inloggen...
  //       <div class="loader">
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //       </div>
  //     </div>
  //   `);
  //   $("#nav-busy").slideDown();
  //   $.ajax("/api/login", {
  //     dataType: 'json',
  //     contentType: 'application/json',
  //     data: JSON.stringify({
  //       username: $(this).find("input[name=username]").val(),
  //       password: $(this).find("input[name=password]").val()
  //     }),
  //     url: '/api/login',
  //     method: 'post',
  //     success: (data) => {
  //       $("#nav-alerts").empty();
  //       $("#nav-alerts").append(`
  //           <div id="nav-done" class="alert alert-success" style="display: none;">
  //             ${data.msg}
  //           </div>
  //       `);
  //       $("#nav-done").slideDown();
  //       setTimeout(() => {
  //         window.location = "/home";
  //       }, 2000);
  //     },
  //     error: (data, status, thrown) => {
  //       console.log(data);
  //       console.log(status);
  //       console.log(thrown);
  //         $("#nav-alerts").empty();
  //         $("#nav-alerts").append(`
  //           <div id="nav-done" class="alert alert-danger" style="display: none;">
  //             ${getTrans(thrown)}
  //           </div>
  //         `);
  //         $("#nav-done").slideDown();
  //     }
  //   });
  // });
  //
  // var getTrans = (og) => {
  //   if (og == "Unauthorized") {
  //     return "De combinatie gebruikersnaam en wachtwoord is incorrect.";
  //   }
  // }
});
