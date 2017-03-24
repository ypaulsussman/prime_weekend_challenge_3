$(document).ready(function() {
  console.log("suuuup");
  getTasks();
}); //end doc ready


function getTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
    success: function(response) {
      console.log(response);
      appendQuery(response);
    }//end success
  });//end ajax
}

function appendQuery(response) {
  $('#taskList').empty();
  for (var i = 0; i < response.length; i++) {
    var task = response[i];
    $('#taskList').append('<tr>');
    var $el = $('#taskList').children().last();
    $el.append('<td>' + task.name + '</td>');
    $el.append('<td><button class="complete pure-button button-error" data-taskid="'+ task.id+'">Complete</button></td>');
  }
}
