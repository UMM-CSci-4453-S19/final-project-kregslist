angular.module('buttons', [])
  .controller('buttonCtrl', ButtonCtrl)
  .factory('buttonApi', buttonApi)
  .constant('apiUrl', 'http://localhost:1337'); // CHANGED for the lab 2017!

  function ButtonCtrl($scope, buttonApi) {
}

function buttonApi($http, apiUrl) {
return {

};
}
