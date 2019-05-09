function TodoController(TodoService) {
    var ctrl = this;
    this.newTodo = '';
    this.list = [];

    function getTodos() {
        TodoService
            .retrieve()
            .then( function( response) {
                ctrl.list = response;
            });
    }

    this.addTodo = function() {
        if (!ctrl.newTodo) {
            return;
        }
        TodoService
            .create({
                title: ctrl.newTodo,
                completed: false
            })
            .then(function(response){
                ctrl.list.unshift(response);
                ctrl.newTodo='';
            });
    };

    this.removeTodo = function(item, index) {
        TodoService 
            .remove(item)
            .then(function(response) {
                ctrl.list.splice(index, 1);
            });
    };

    this.updateTodo = function (item, index) {
        if(!item.title){
            ctrl.removeTodo(item, index);
            return;
        }
        TodoService
            .update(item);
    }

    this.getRemaining = function(){
        return this.list.filter( function (item) {
            return !item.completed;
        });
    };

    this.toggleState = function(item) {
        TodoService
            .update(item)
            .then(function() {
                //success and do nothing
                console.log("TOGGLE");
            }, function(){
                //error
                item.completed = !item.completed;
            });
    };

    getTodos();
};



angular
    .module('app')
    .controller('TodoController', TodoController);