$(function(){

  function buildHTML(message){
    if( message.image){
      var html = `<div class="mainChat__messageList--detail" data-message-id = ${message.id} >
                      <ul>
                        <li class="mainChat__messageList--contributor">
                        ${message.user_name}
                        </li>
                        <li class="mainChat__messageList--date">
                        ${message.time}
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
      var html = `<div class="mainChat__messageList--detail" data-message-id = ${message.id} >
                      <ul>
                        <li class="mainChat__messageList--contributor">
                        ${message.user_name}
                        </li>
                        <li class="mainChat__messageList--date">
                        ${message.time}
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
      $('#message_image').val('');
      $('.mainChat__messageForm--submitBtn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.mainChat__messageForm--submitBtn').prop("disabled", false);
    });
  });

    var reloadMessages = function(){
      var last_message_id = $('.mainChat__messageList--detail:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message){
            insertHTML += buildHTML(message)
          });
          $('.mainChat__messageList--details').append(insertHTML);
          $('.mainChat__messageList').animate({ scrollTop: $('.mainChat__messageList')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      })
    };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
