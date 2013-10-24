
var app = angular.module('app',  []);

app.controller('PageCtrl', function($scope){
  $scope.pageArray = [0,1,2,3,4];
  $scope.currentPage = 0;
  
  $scope.change= function($targetPage, $window) {
    if($window)
    {
      if($scope.currentPage == 0)
      {
        $scope.currentPage = $targetPage;
      }
      else
      {
        return false;
      }
    }
    else if (!$window)
    {
      $scope.currentPage = $targetPage;
    }
  }
});

app.controller('TestCtrl', function($scope) {
  $scope.test1 = {
    list1: [{word:"dot"}, {word:"table"}, {word: "pencil"}, {word: "tree"}, {word: "proom"}, {word: "bike"}, {word: "amigo"}, {word: "dog"}, {word: "mafer"}, {word: "lamp"}, {word: "drink"}, {word: "mary"}, {word: "had"}, {word: "a"}, {word: "little"}, {word: "lamb"}, {word: "polit"}, {word: "floor"}, {word: "letter"}],
    list2: [{word:"there"}, {word:"is"}, {word:"much"}, {word:"to"}, {word:"be"}, {word:"learned"}, {word:"from"}, {word:"the"}, {word:"very"}, {word:"interesting"}, {word:"information"}, {word:"that"}, {word:"is"}, {word:"being"}, {word:"presented"}, {word:"in"}, {word:"the"}, {word:"middle"}, {word:"stream"}],
    list3: [{word:"tark"}, {word:"choice"}, {word:"madre"}, {word:"blend"}, {word:"cube"}, {word:"klipe"}, {word:"green"}, {word:"little"}, {word:"miss"}, {word:"muffet"}, {word:"umbrella"}, {word:"week"}, {word:"bird"}, {word:"try"}, {word:"zink"}, {word:"polite"}, {word:"if"}, {word:"bonjour"}, {word:"trunk"}]
  };
  
  $scope.test2 = {list1: [{word:"jump"}, {word:"ball"}, {word: "glass"}, {word: "murder"}, {word: "chair"}, {word: "paper"}, {word: "danger"}, {word: "food"}, {word: "clock"}, {word: "hate"}, {word: "book"}, {word: "plate"}, {word: "sex"}, {word: "case"}, {word: "horror"}, {word: "phone"}, {word: "hell"}, {word: "phony"}, {word: "relative"}],
    list2: [{word:"even"}, {word:"when"}, {word:"carefully"}, {word:"attending"}, {word:"to"}, {word:"just"}, {word:"the"}, {word:"middle"}, {word:"stream"}, {word:"people"}, {word:"sometimes"}, {word:"notice"}, {word:"emotionally"}, {word:"charged"}, {word:"words"}, {word:"in"}, {word:"the"}, {word:"other"}, {word:"stream"}],
    list3: [{word:"feeble"}, {word:"red"}, {word:"love"}, {word:"thud"}, {word:"grass"}, {word:"kill"}, {word:"face"}, {word:"grave"}, {word:"funny"}, {word:"museum"}, {word:"iron"}, {word:"help"}, {word:"quiet"}, {word:"file"}, {word:"pain"}, {word:"shoe"}, {word:"away"}, {word:"scream"}, {word:"fire"}]
  };

  $scope.list1='(ignore)';
  $scope.list2='(attend)';
  $scope.list3='(ignore)';  
  $scope.stimuli = false;
  $scope.replay = false;
  $scope.not_started = true;
  $scope.test = 1;
  $scope.myInterval;
  
  $scope.startTest= function() {
    if($scope.test == 1)
    {
      $scope.stimuliList = $scope.test1; 
    }else
    { 
      $scope.stimuliList = $scope.test2;
    }     
    
    $i = 0;
    $scope.myInterval=setInterval(function(){
      $scope.list1 = $scope.stimuliList.list1[$i]['word'];
      $scope.list2 = $scope.stimuliList.list2[$i]['word'];
      $scope.list3 = $scope.stimuliList.list3[$i]['word'];
      $i++;
      if($i == $scope.stimuliList.list1.length)
      {
        $scope.stopTest();
      }
      $scope.$apply();
    },200);
    
    $scope.not_started=false;
    return false;
  }
  
  $scope.pauseTest = function(){
  
  }
  
  $scope.stopTest = function() {
    clearInterval($scope.myInterval);
  }
  
  $scope.reinitTest= function(test) {
    $scope.test = test;
    $scope.stimuli = false;
    $scope.replay = false;
    $scope.not_started = true;
    $scope.list1='(ignore)';
    $scope.list2='(attend)';
    $scope.list3='(ignore)';  
  }
  
});



app.controller('ButtonsCtrl', function($scope){
  $scope.singleModel = 1;
});
