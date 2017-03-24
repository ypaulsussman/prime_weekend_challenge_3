$(document).ready(function() {
  console.log("suuuup");
  getTasks();
  addEventListeners();
});





function addEventListeners() {
  $("#newTask").on('submit', function(event) {
    event.preventDefault();
    if ($('#taskName').val()){
      addTask();
    } else {
      $("#newTask").append('<br><h1 id="reminder">Please add a task!</h1>');
    }
  });//end

}//end addEventListeners









function getTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
    success: function(response) {
      console.log(response);
      appendQuery(response);
    }
  });
}

function appendQuery(response) {
  $('#taskList').empty();
  for (var i = 0; i < response.length; i++) {
    var task = response[i];
    $('#taskList').append('<tr>');
    var $el = $('#taskList').children().last();
    $el.append('<td>' + task.name + '</td>');
    $el.append('<td><button class="complete pure-button button-error" data-taskid="'+ task.id+'">Complete</button></td>');
    $el.append('<td><button class="delete pure-button button-error" data-taskid="'+ task.id+'">Delete</button></td>');
  }
}

function addTask(){
  var taskToAdd = {
    name: $('#taskName').val()
  };
  $.ajax({
    type: "POST",
    url: "/tasks/add",
    data: taskToAdd,
    success: function(response) {
      console.log(response);
      getTasks();
      $('#taskName').val('');
      $('#reminder').remove();
    }
  });
}//end addTask
