$(document).ready(() => {
  $('textarea[name=new-post]').keydown(function(event) {
    if (event.keyCode == 13) {
       $(this.form).submit();
       return false;
    }
  }).focus(function(){
    if(this.value == "What's up?"){
      this.value = "";
    }
  }).blur(function(){
    if(this.value==""){
      this.value = "What's up?";
    }
  });

  $("#new-post").submit((e) => {
    e.preventDefault();
    $("#submit-post").attr('value', 'Bezig met posten...').attr('disabled', 'true');
    console.log($("#textarea-text").val());
    $.ajax('/api/post', {
      method: 'post',
      dataType: 'json',
      url: '/api/post',
      contentType: 'application/json',
      data: JSON.stringify({
        text: $("#textarea-text").val()
      }),
      success: (data) => {
        $("#submit-post").attr('value', 'Gepost!').attr('class', 'btn btn-success');
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    })
  });

  $('.posts').masonry({
    itemSelector: '.post',
    columnWidth: 340
  });
})
