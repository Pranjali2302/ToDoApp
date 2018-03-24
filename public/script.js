var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope,$http) {
    $scope.todoList = [];
    $scope.getAllItem = function(){
        $http.get('http://localhost:8080/api/getList')
        .then(function(response) {
            $scope.todoList =response.data;
        });
    }    
    
    $scope.getAllItem();
    $scope.addItem = function(item){
        if(item == "" || item == undefined){
            return;
        }
        var data ={
            name:item
        }
       $http.post('http://localhost:8080/api/addItem',data)
        .then(function(response) {
            $scope.todoList.push(response.data);
            $scope.name ="";
        }); 
    }
    $scope.updateItem = function(data){
       $http.put('http://localhost:8080/api/updateItem/'+data._id,data)
        .then(function(response) {
            if(response.status == 200){
                $scope.getAllItem();
            }
        });
    }
    $scope.removeItem = function(data){
        $http.delete('http://localhost:8080/api/deleteItem/'+data._id)
        .then(function(response) {
            if(response.status == 200){
                $scope.getAllItem();
            }
        });
    }
});