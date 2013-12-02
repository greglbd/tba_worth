'use_strict';

angular.module('app.controllers', [])
.controller('PageCtrl', function($scope){
  
  //Variables
  $scope.activity_title = "Selective Attention";
  $scope.currentPage = 3;
  $scope.finished = false;
  $scope.questions = false;
  $scope.restart = false;
  $scope.pageCopy = [
    {
      copy: [
        { line: "You are a participant in an experiment on selective attention. Click play to see three rapid streams of words in the box below. Your task is:" },
        { line: "BE SURE THAT YOU ATTEND TO THE MIDDLE STREAM ONLY, SO YOU DON'T MISS ANY OF THE WORDS IN IT."  },
        { line: "To ensure that you attend to every word in the middle stream, you should shadow the words silently in your mind as they go by. You can replay the streams as many times as you like. When you feel confident you have carried out this task successfully, click FINISHED."  }
      ]
    },
    {
      copy: [
        { line: "Did you notice anything in the top and bottom streams?" },
        { line: "Experiments like this are typically carried out with auditory stimuli (streams of spoken words), not visual stimuli. And typically, participants notice very little in the unattended streams."  },
        { line: "In this case, some of the words in the unattended streams were words from a foreign language, words from a nursery rhyme, or not even words at all. Click REPLAY to see how easy it is to notice these features if you aren't attending elsewhere and how difficult it is if you're attending to the middle stream. Click SHOW THE STIMULI to see the streams in full."  }
      ]
    },
    {
      copy: [
        { line: "Now try another trial. Click PLAY to present the stimuli. Remember:" },
        { line: "BE SURE THAT YOU ATTEND TO THE MIDDLE STREAM ONLY, SO YOU DON'T MISS ANY OF THE WORDS IN IT."  },
        { line: "When you feel confident that you have carried out this task successfully, click FINISHED."  }
      ]
    },
    {
      copy: [
        { line: "In this trial, the top and bottom streams contained some emotionally charged words. Did you notice any of them?" },
        { line: "Click REPLAY to try again—still attending to the middle stream—and see if you notice these words."  },
        { line: "Click SHOW THE STIMULI to see the streams in full."  }
      ]
    }
  ];
  $scope.currentPageCopy = $scope.pageCopy[0];

  //functions
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
  $scope.startPageClick = function(){
    if($scope.currentPage == 0 && !$scope.restart)
    {
      $scope.change(1, 'home')
    }else
    {
      $scope.restart = false;
    }
  } 
  //change page
  $scope.change= function($targetPage, $window) {
    if($targetPage==0 && $scope.currentPage == 0)
    {
      $scope.currentPage = $targetPage;
      $scope.restart = true;
      return;
    }
    
    //console.log($targetPage + ' : ' + $scope.currentPage)
    if($window && !$scope.restart)
    {
      if($scope.currentPage == 0)
      {
        $scope.updateHeader($scope.currentPage);
        $scope.currentPage = $targetPage;
        //console.log('hello everyone');
      }
      else
      {
        return false;
      }
    }
    else if (!$window && !$scope.restart)
    {
      $scope.currentPage = $targetPage;
    }
    
    if($scope.currentPage == 3)
    {
      $scope.questions = true;
    }
  }
  
  
  //test finished
  $scope.setFinish = function(b){
    $scope.finished = b;
  }
  
  //next page
  $scope.nextPage= function(check){
    if(check == 'override')
    {
      if(!$scope.complete)
      {
        $scope.$broadcast("SHOW_WARNING");
        return false;
      }
    }
    else
    {
      if(!$scope.finished)
        $scope.currentPage++;
      else
        $scope.currentPage+=2;
      
      if($scope.currentPage == 4)
      {
        $scope.setFinish(true);
      }
      $scope.change($scope.currentPage);
    }
    
  }
  
  //previous page
  $scope.prevPage= function(){
    $scope.currentPage--;
    //console.log('prev: ' + $scope.currentPage);
    $scope.change($scope.currentPage);
  }
  
  //update the copy in the header
  $scope.updateHeader = function($index) {
    $scope.currentPageCopy = $scope.pageCopy[$index];
  }

})

.controller('TestCtrl', function($scope, $modal) {

//Controller for actual test
  //Variables
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
  
  //Start the streams
  $scope.startTest= function() {
    $scope.isplaying = true;
    $scope.complete = false;
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
        if($i < $scope.stimuliList.list1.length)
        {
          $scope.list1 = $scope.stimuliList.list1[$i]['word'];
          $scope.list2 = $scope.stimuliList.list2[$i]['word'];
          $scope.list3 = $scope.stimuliList.list3[$i]['word'];
          $i++;
        }
        else if($i == $scope.stimuliList.list1.length)
        {
          setTimeout(function(){
            $scope.list1='(ignore)';
            $scope.list2='(attend)';
            $scope.list3='(ignore)';
            $scope.stopTest();
            $scope.safeApply();
          }, 200);          
          $scope.complete = true;
        }
        $scope.safeApply();
      },200);
    }, 1000);
        
    $scope.not_started=false;
    return false;
  }
  
  //stop the test
  $scope.stopTest = function() {
    clearInterval($scope.myInterval);
    
    if($scope.test==1)
    {
      $scope.updateHeader(1);
    }else if($scope.test==2)
    {
      $scope.updateHeader(3);
    }
    $scope.isplaying = false;
    $scope.safeApply(); 
  }
  
  //initialise test and variables
  $scope.initTest= function(test) {
    if(test)
    {
      if(test==2)
      {
        $scope.updateHeader(test);
      }
    }
    $scope.stimuli = false;
    $scope.replay = false;
    $scope.isplaying = false;
    $scope.complete = false;
    $scope.list1='(ignore)';
    $scope.list2='(attend)';
    $scope.list3='(ignore)';  
  }
  
  //finish test
  $scope.finishTest=function(){
    $scope.test++;
    if($scope.test>2)
    {    
      $scope.nextPage();
    }
    else
      $scope.initTest($scope.test);
  }
  
   //open modal
  $scope.openModalTest = function (template) {
    var modalInstance = $modal.open({
      templateUrl: template,
      controller: ModalInstanceCtrl,
      resolve: {
        userFeedback: function () {
          return $scope.userFeedback;
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.nextPage();
    }, function () {
      //$scope.questionsControl('prev');
    });
  };
  $scope.$on("SHOW_WARNING", function(event, data){
    //console.log($scope.test)
    if($scope.test==2 && $scope.complete)
      $scope.nextPage();
    else
      $scope.openModalTest('warningModal.html');  
  });
})

//Modal instance controller
var ModalInstanceCtrl = function ($scope, $modalInstance, userFeedback) {
  $scope.copy = userFeedback;
  
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}


