  
  var app = angular.module('app',  []);
  app.controller('NavListCtrl', function($scope) {
    $scope.nav = [
      {
        "name": "HOME",
        "link": "#home"
      },{
        "name": "ABOUT",
        "link": "#about"
      },{
        "name": "MEDIA",
        "link": "#media"
      }
    ];
  });
  /*
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'video.html',   controller: 'homeCtrl'});
    $routeProvider.when('/test', {templateUrl: 'test.html',   controller: 'testCtrl'});
  }]);
  */
  
  app.controller('PageCtrl', function($scope){
    $scope.pageArray = [0,1,2,3,4];
    $scope.currentPage = 1;
    $scope.change= function(targetPage) {
      $scope.currentPage = targetPage;
    }
  });
  
  app.controller('TestCtrl', function($scope) {
    $scope.test1 = {
      list1: [{word:"dot"}, {word:"table"}, {word: "pencil"}, {word: "tree"}, {word: "proom"}, {word: "bike"}, {word: "amigo"}, {word: "dog"}, {word: "mafer"}, {word: "lamp"}, {word: "drink"}, {word: "mary"}, {word: "had"}, {word: "a"}, {word: "little"}, {word: "lamb"}, {word: "polit"}, {word: "floor"}, {word: "letter"}],
      list2: [{word:"there"}, {word:"is"}, {word:"much"}, {word:"to"}, {word:"be"}, {word:"learned"}, {word:"from"}, {word:"the"}, {word:"very"}, {word:"interesting"}, {word:"information"}, {word:"that"}, {word:"is"}, {word:"being"}, {word:"presented"}, {word:"in"}, {word:"the"}, {word:"middle"}, {word:"stream"}],
      list3: [{word:"tark"}, {word:"choice"}, {word:"madre"}, {word:"blend"}, {word:"cube"}, {word:"klipe"}, {word:"green"}, {word:"little"}, {word:"miss"}, {word:"muffet"}, {word:"umbrella"}, {word:"week"}, {word:"bird"}, {word:"try"}, {word:"zink"}, {word:"polite"}, {word:"if"}, {word:"bonjour"}, {word:"trunk"}]
    };
  
    $scope.list1='(ignore)';
    $scope.list2='(attend)';
    $scope.list3='(ignore)';
    $scope.stimuli = false;
    $scope.replay = false;
    
    $scope.startTest= function(test) {
      if(test == 1)
      {
        $scope.stimuliList = $scope.test1;
          console.log($scope.stimuliList);
      for (var i=0; i<$scope.stimuliList.list1.length; i++){
          console.log('hello' + i);
          console.log($scope.stimuliList.list1[i].word)
      } 
      }else
      { 
        $scope.stimuliList = $scope.test2;
      }     
      console.log('startTest');
    }
    
  });
  
  
  
  app.controller('ButtonsCtrl', function($scope){
    $scope.singleModel = 1;
  });
