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
});