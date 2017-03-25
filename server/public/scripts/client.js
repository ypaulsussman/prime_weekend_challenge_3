var taskID;

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
  });

  $("#taskList").on('click', '.completeButton', function() {
    taskID = $(this).data('taskid');
    completeTask(taskID);
  });//end

  $("#taskList").on('click', '.deleteButton', function() {
    taskID = $(this).data('taskid');
    deleteTask(taskID);
  });//end

}//end addEventListeners









function getTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
    success: function(response) {
      appendQuery(response);
    }
  });
}

function appendQuery(response) {
  $('#taskList').empty();
  for (var i = 0; i < response.length; i++) {
    var task = response[i];
    $('#taskList').append('<tr id="'+ task.id +'">');
    var $el = $('#taskList').children().last();
    $el.append('<td>' + task.name + '</td>');
    var idSelector = '#'+task.id;
    $el.append('<td><button class="completeButton pure-button button-error" data-taskid="'+ task.id+'">Complete</button></td>');
    $el.append('<td><button class="deleteButton pure-button button-error" data-taskid="'+ task.id+'">Delete</button></td><br>');
    if (task.complete) {
      $(idSelector).addClass("completeTask");
    }

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
      getTasks();
      $('#taskName').val('');
      $('#reminder').remove();
    }
  });
}//end addTask

function completeTask(taskID) {
  var taskToComplete = {taskID: taskID};
  $.ajax({
    type: "PUT",
    url: "/tasks/complete/",
    data: taskToComplete,
    success: function() {
      getTasks();
    }
  });
}

function deleteTask(taskID) {
  if (window.confirm("Are you sure you want to delete this task?")) {
    $.ajax({
      type: "DELETE",
      url: "/tasks/delete/" + taskID,
      success: function() {
        console.log("delete call success");
        getTasks();
      }
    });
  }
}
