$(document).ready(function() {
  getList();

  //
  $('#todo-add').click(function() {
    // Leggo il valore della input
    var inputText = $('#todo-text').val();

    // Se non è nullo, eseguo una chiamata ajax per appendere gli elementi alla lista (metodo POST),
    // richiamando la funzione getList()
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

// Evento di cancellazione di ogni singolo elemento al click su ciascun pulsante "Elimina"
$(document).on('click', '.delete',
function() {
  // Richiamo l'id assegnato casualmente dal server a ciascun elemento creato
  var id = $(this).parent().attr('data-id');

  // Eseguo la chiamata ajax per cancellare un elemento sia dalla pagina sia dal server (metodo DELETE)
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

// ****************FUNZIONI*******************

// Creo una funzione con la chiamata ajax per ottenere la lista (metodo GET)
  function getList() {
    $.ajax(
      {
        url: 'http://157.230.17.132:3008/todos/',
        method: 'GET',
        success: function(dataResponse) {

          if (dataResponse.length > 0) {

            // Svuoto la input ad ogni click su "aggiungi"
            $('#todo-list').html('');

            // Popolo la lista tramite Handlebars
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
