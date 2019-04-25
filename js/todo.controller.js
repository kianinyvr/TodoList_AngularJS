function TodoController() {
    this.list = [{
        title: 'First todo item!',
        completed: true
    },{
        title: 'Second todo item!',
        completed: false
    }, {
        title: 'Third todo item!',
        completed: true
    },];
}

angular
    .module("app")
    .controller("TodoController", TodoController);