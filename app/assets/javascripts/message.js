$(function(){

  function buildHTML(message){
    if( message.image){
      var html = `<div class="mainChat__messageList--detail">
                      <ul>
                        <li class="mainChat__messageList--contributor">
                        ${message.user_name}
                        </li>
                        <li class="mainChat__messageList--date">
                        ${message.created_at}
                        </li>
                      </ul>
                      <div class="mainChat__messageList--content">
                        <p>
                        ${message.body}
                        </p>
                      <img src=${message.image}>
                      </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="mainChat__messageList--detail">
                      <ul>
                        <li class="mainChat__messageList--contributor">
                        ${message.user_name}
                        </li>
                        <li class="mainChat__messageList--date">
                        ${message.created_at}
                        </li>
                      </ul>
                      <div class="mainChat__messageList--content">
                        <p>
                        ${message.body}
                        </p>
                      </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.mainChat__messageList--details').append(html);
      $('.mainChat__messageList').animate({ scrollTop: $('.mainChat__messageList')[0].scrollHeight});
      $('#message_body').val('');
      $('.mainChat__messageForm--submitBtn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});