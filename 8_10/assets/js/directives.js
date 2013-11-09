'use strict';

/* Directives */
angular.module('app.directives', [])
.directive('confirmOnExit', function() {

  //Catch url location change to get user to complete test.
  return {
    link: function($scope, elem, attrs) {
      window.onbeforeunload = function(){
        if (!$scope.finished) {
          return "You haven't completed the test";
        }
      }
      $scope.$on('$locationChangeStart', function(event, next, current) {
        if (!$scope.finished) {
          if(!confirm("You haven't completed the test")) {
              event.preventDefault();
          }
        }
      });
    }
  };
})
.directive('keyCtrl', function() {
  //Key press controller
  return {
    controller: function($scope) {
      $scope.spaceCount = 0;
      $scope.spacePressCallback = function($event) {
        console.log($event);
        $event.preventDefault();        
        $scope.spaceCount++;
        console.log($scope.spaceCount);
      };
      
      
      $scope.aPressCallback = function($event) {
        console.log('A press');
        $event.preventDefault();   
      };
      
      $scope.pPressCallback = function($event) {
        console.log('P press');
        $event.preventDefault();   
      };
    }
  };
});