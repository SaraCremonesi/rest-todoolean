$(document).ready(function() {
  getList();

  $('#todo-add').click(function() {
    var inputText = $('#todo-text').val();

    if(inputText.length > 0) {
      $.ajax(
        {
          url: 'http://157.230.17.132:3008/todos/',
          method: 'POST',
          data: {
            text: inputText
          },
          success: function(dataResponse) {
            getList();
          },
          error: function() {
            alert('C\'è stato un disguido, riprova');
          }
        }
      );
    } else {
      alert('Inserisci un elemento');
    }

  }
);

 $(document).on('click', '.delete',
 function() {
   var id = $(this).parent().attr('data-id');

   $.ajax(
     {
       url: 'http://157.230.17.132:3008/todos/' + id,
       method: 'DELETE',
       success: function(dataResponse) {
         getList();
         $('#todo-list').html('');
       },
       error: function() {
         alert('Impossibile eliminare l\'elemento');
       }
     }
   );
 });


  function getList() {
    $.ajax(
      {
        url: 'http://157.230.17.132:3008/todos/',
        method: 'GET',
        success: function(dataResponse) {

          if (dataResponse.length > 0) {
            $('#todo-list').html('');
            var source = $('#todo-template').html();
            var template = Handlebars.compile(source);

            for (var i = 0; i < dataResponse.length; i++) {
              var data = dataResponse[i];
              $('#todo-text').val('');
              var html = template(data)
              $('#todo-list').append(html);
            }
          }
        },
        error: function() {
          alert('Errore');
        }
      }
    )
  }

});
