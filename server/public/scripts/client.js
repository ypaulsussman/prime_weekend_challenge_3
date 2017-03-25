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
    $el.append('<td><h3>' + task.name + '</h3></td>');
    var idSelector = '#'+task.id;
    if (task.complete) {
      $(idSelector).addClass("completeTask");
      $el.append('<td><button class="completeButton" data-taskid="'+ task.id+'" disabled>Complete</button></td>');
    } else {
      $el.append('<td><button class="completeButton" data-taskid="'+ task.id+'">Complete</button></td>');
    }
    $el.append('<td><button class="deleteButton" data-taskid="'+ task.id+'">Delete</button></td><br>');

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
  swal({
    title: "Reeeeeeeeaaaaaaaally?",
    text: "Are you sure you want to delete this task?",
    type: "warning",
    showCancelButton: true,
    closeOnConfirm: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "salmon"
  }, function() {
    $.ajax({
      type: "DELETE",
      url: "/tasks/delete/" + taskID,
      success: function() {
        console.log("delete call success");
        getTasks();
      }
    });
  });
}

// if (window.confirm("Are you sure you want to delete this task?")) {
  // $.ajax({
  //   type: "DELETE",
  //   url: "/tasks/delete/" + taskID,
  //   success: function() {
  //     console.log("delete call success");
  //     getTasks();
  //   }
  // });
// }
