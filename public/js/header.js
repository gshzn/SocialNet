// $(document).ready(() => {
//   $("#login-nav").submit((e) => {
//     e.preventDefault();
//     $("#nav-alerts").empty();
//     $("#nav-alerts").append(`
//       <div id="nav-busy" style="display: none;" class="alert alert-success">
//         Bezig met inloggen...
//         <div class="loader">
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     `);
//     $("#nav-busy").slideDown();
//     $.ajax("localhost/api/login", {
//       dataType: 'json',
//       contentType: 'application/json',
//       data: JSON.stringify({
//         username: $(this).find("input[name=username]").val(),
//         password: $(this).find("input[name=password]").val()
//       }),
//       url: 'http://localhost:8080/api/login',
//       method: 'post',
//       success: (data) => {
//         $("#nav-alerts").empty();
//         $("#nav-alerts").append(`
//             <div id="nav-done" class="alert alert-success" style="display: none;">
//               ${data.msg}
//             </div>
//         `);
//         $("#nav-done").slideDown();
//         setTimeout(() => {
//           window.location.refresh();
//         }, 2000);
//       },
//       error: (data, status, thrown) => {
//         console.log(data);
//         console.log(status);
//         console.log(thrown);
//           $("#nav-alerts").empty();
//           $("#nav-alerts").append(`
//             <div id="nav-done" class="alert alert-danger" style="display: none;">
//               ${getTrans(thrown)}
//             </div>
//           `);
//           $("#nav-done").slideDown();
//       }
//     });
//   });
//
//   var getTrans = (og) => {
//     if (og == "Unauthorized") {
//       return "De combinatie gebruikersnaam en wachtwoord is incorrect.";
//     }
//   }
// });
