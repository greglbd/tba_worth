
var app = angular.module('app',  []);

app.controller('PageCtrl', function($scope){
  $scope.currentPage = 0;
  
  $scope.pageCopy = [
    {
      copy: [
        { line: "You are a participant in an experiment on selective attention. Click play to see three rapid streams of words in the box below. Your task is:" },
        { line: "BE SURE THAT YOU ATTEND TO THE MIDDLE STREAM ONLY, SO YOU DON'T MISS ANY OF THE WORDS IN IT."  },
        { line: "To ensure that you attend to every word in the middle stream, you should shadow the words silently in your mind as they go by. You can replay the streams as many times as you like. When you feel confident that you have carried out this task successfully, click finished"  }
      ]
    },
    {
      copy: [
        { line: "Did you notice anything in the top and bottom streams?" },
        { line: "Experiments like this are typically carried out with auditory stimuli (streams of spoken words), not visual stimuli. And typically, participants notice very little in the unattended streams."  },
        { line: "In this case, some of the words in the unattended streams were words from a foreign language, words from a nursery rhyme, or not even words at all. Click REPLAY to see how easy it is to notice these features if you aren't attending elsewhere and how difficult it is if you're attending to the middle stream. Click SHOW THE STIMULI to see the streams in full."  }
      ]
    }
  ];
  $scope.currentPageCopy = $scope.pageCopy[0];

  $scope.change= function($targetPage, $window) {
    console.log('test');
    if($window)
    {
      if($scope.currentPage == 0)
      {
        $scope.updateHeader($scope.currentPage);
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
  
  $scope.updateHeader = function($index) {
    $scope.currentPageCopy = $scope.pageCopy[$index];
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

  $scope.test = 1;
  $scope.myInterval;
  
  $scope.startTest= function() {
    $scope.isplaying = true;
    $scope.notcomplete = true;
    if($scope.test == 1)
    {
      $scope.stimuliList = $scope.test1; 
    }else
    { 
      $scope.stimuliList = $scope.test2;
    }     
    
    $i = 0;
    $scope.list1 = '+';
    $scope.list2 = '+';
    $scope.list3 = '+';
    setTimeout(function(){
      $scope.myInterval=setInterval(function(){
        $scope.list1 = $scope.stimuliList.list1[$i]['word'];
        $scope.list2 = $scope.stimuliList.list2[$i]['word'];
        $scope.list3 = $scope.stimuliList.list3[$i]['word'];
        $i++;
        if($i == $scope.stimuliList.list1.length)
        {
          $scope.stopTest();
          $scope.notcomplete = false;
        }
        $scope.$apply();
      },200);
    }, 1000);
        
    $scope.not_started=false;
    return false;
  }
  
  $scope.stopTest = function() {
    clearInterval($scope.myInterval);
    $scope.isplaying = false;
  }
  
  $scope.initTest= function(test) {
    if(test)
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
