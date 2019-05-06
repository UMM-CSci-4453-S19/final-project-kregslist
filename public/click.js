angular.module('buttons', [])
  .controller('KregCtrl', KregCtrl)
  .factory('kregApi', kregApi)
  .constant('apiUrl', 'http://localhost:1337');

  function KregCtrl($scope, kregApi) {
    $scope.post=[];
    $scope.category=[];
    $scope.user=[];
    $scope.errorMessage='';
    $scope.isLoading=isLoading;

    $scope.createPost=createPost;
    $scope.filter=filter;
    $scope.createUser=createUser;
    $scope.remove=remove;

    var loading = false;

    function isLoading(){
      return loading;
    }

    function refreshPost(){
      loading=true;
      $scope.errorMessage='';
      kregApi.getPost()
        .success(function(data){
          console.log(data);
           $scope.post=data;
           loading=false;
        })
        .error(function () {
            $scope.errorMessage="Unable to load Post:  Database request failed";
            loading=false;
        });;
   }

   function refreshUser(){
     loading=true;
     $scope.errorMessage='';
     kregApi.getUser()
       .success(function(data){
         console.log(data);
          $scope.user=data;
          loading=false;
       })
       .error(function () {
           $scope.errorMessage="Unable to load User:  Database request failed";
           loading=false;
       });;
  }

   function createPost(){
     var w = document.getElementById("title").value;
     var x = document.getElementById("description").value;
     var y = document.getElementById("price").value;
     var z = document.getElementById("category").value;
     var u = document.getElementById("currentUser").value

     console.log("creating post");
     console.log(w);
     loading=true;
     $scope.errorMessage='';
     kregApi.postCreate(w,x,y,z,u)
     .success(function(){})
     .error(function(){$scope.errorMessage="Unable create post";});

     refreshPost();
   }

   function createUser(){
     var username = document.getElementById("username").value;
     var password = document.getElementById("password").value;
     var firstn = document.getElementById("firstn").value;
     var lastn = document.getElementById("lastn").value;
     var email = document.getElementById("email").value;

     console.log("creating user");

     loading=true;
     $scope.errorMessage='';
     kregApi.userCreate(username,password,firstn,lastn,email)
     .success(function(){})
     .error(function(){$scope.errorMessage="Unable create post";});

     refreshUser();
   }

   function refreshCategory(){
     loading=true;
     $scope.errorMessage='';
     kregApi.getCategory()
       .success(function(data){
         console.log(data);
          $scope.category=data;
          loading=false;
       })
       .error(function () {
           $scope.errorMessage="Unable to load Category:  Database request failed";
           loading=false;
       });
   }

   function filter(){
     var c = document.getElementById("filterCategory").value;
     var min = document.getElementById("min").value;
     var max = document.getElementById("max").value;

     loading=true;
     $scope.errorMessage='';

     kregApi.filter(c,min,max)
       .success(function(data){
         console.log(data);
          $scope.post=data;
          loading=false;
       })
       .error(function () {
           $scope.errorMessage="filter error";
           loading=false;
       });
   }

   function remove($event){
     console.log($event.target.id);
      $scope.errorMessage='';
      kregApi.delete($event.target.id)
         .success(function(){})
         .error(function() {
           $scope.errorMessage="Unable to delete";
         });

     refreshPost();
   }


   refreshPost();
   refreshCategory();
   refreshUser();
}

function kregApi($http, apiUrl) {
return {
  getPost: function(){
  var url = apiUrl + '/post';
  return $http.get(url);
  },
  getCategory: function(){
    var url = apiUrl + '/category';
    return $http.get(url);
  },
  getUser: function(){
    var url = apiUrl +'/login';
    return $http.get(url);
  },
  postCreate: function(t,d,p,c,u){
    var url = apiUrl+'/create?title='+t+'&desc='+d+'&price='+p+'&cat='+c+'&user='+u;
    console.log(url);
    return $http.get(url);

  },
  userCreate: function(u,p,f,l,e){
    var url = apiUrl+'/user?username='+u+'&password='+p+'&firstn='+f+'&lastn='+l+'&email='+e;
    console.log(url);
    return $http.get(url);
  },
  filter: function(c,min,max){
    var url = apiUrl+'/filter?cat='+c+'&min='+min+'&max='+max;
    console.log(url);
    return $http.get(url);
  },
  delete: function(id){
    console.log(id)
    var url = apiUrl+'/delete?id='+id;
    return $http.get(url);
  }
};
}
