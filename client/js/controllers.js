todoApp.controller('TodoCtrl', ['$rootScope', '$scope', 'todosFactory', function($rootScope, $scope, todosFactory) {

  $scope.todos = [];
  $scope.isEditable = [];

  todosFactory.getTodos().then(function(data) {
    $scope.todos = data.data;
  });

  $scope.save = function($event) {
    if($event.which == 13 && $scope.todoInput) {
      todosFactory.saveTodo({
        "todo": $scope.todoInput,
        "isCompleted": false
      }).then(function(data) {
        $scope.todos.push(data.data);
      });
      $scope.todoInput = '';
    }
  };

  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.todos[i];

    todosFactory.updateTodo({
      _id: _id,
      isCompleted: cbk,
      todo: _t.todo
    }).then(function(data) {
      debugger;
      if(data.data.ok) {
        _t.isCompleted = cbk;
      } else {
        alert('something broke');
      }
    });
  };

  $scope.edit = function($event, i) {
    if($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.todos[i];
      todosFactory.updateTodo({
        _id: _t._id,
        todo: $event.target.value.trim(),
        isCompleted: _t.isCompleted
      }).then(function(data) {
        if(data.data.ok) {
          _t.todo = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('something broke');
        }
      });
    }
  };

  $scope.delete = function(i) {
    todosFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
      if(data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };

}]);
