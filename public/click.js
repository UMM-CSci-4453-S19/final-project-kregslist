angular.module('buttons', [])
  .controller('KregCtrl', KregCtrl)
  .factory('kregApi', kregApi)
  .constant('apiUrl', 'http://localhost:1337');

  function KregCtrl($scope, kregApi) {
    $scope.post=[];
    $scope.category=[];
    $scope.errorMessage='';
    $scope.isLoading=isLoading;

    $scope.createPost=createPost;

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

   function createPost(){
     var w = document.getElementById("title").value;
     var x = document.getElementById("description").value;
     var y = document.getElementById("price").value;
     var z = document.getElementById("category").value;

     console.log("creating post");
     console.log(w);
     loading=true;
     $scope.errorMessage='';
     kregApi.postCreate(w,x,y,z)
     .success(function(){})
     .error(function(){$scope.errorMessage="Unable create post";});
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
       });;
   }

   refreshPost();
   refreshCategory();
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
  postCreate: function(t,d,p,c){
    var url = apiUrl+'/create?title='+t+'&desc='+d+'&price='+p+'&cat='+c;
    console.log(url);
    return $http.get(url);
  }
};
}
